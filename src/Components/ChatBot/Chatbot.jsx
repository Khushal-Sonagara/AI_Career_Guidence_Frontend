import React, { useState, useRef, useEffect } from "react";
import mammoth from "mammoth"; // For DOC files
import * as pdfjsLib from "pdfjs-dist";

// Set the path to the worker (CDN version)
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

const Chatbot = () => {
    const [messages, setMessages] = useState([]); // Chat history
    const [inputMessage, setInputMessage] = useState(""); // User input
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [fileContent, setFileContent] = useState(""); // Extracted file content
    const api_key = import.meta.env.VITE_APP_AI_CAREER_GUIDANCE_GOOGLE_API_KEY

    const chatHistoryRef = useRef(null); // Reference for chat history container

    // Scroll to the bottom of the chat when a new message is added
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]); // Runs every time messages change

    const handleSendMessage = async () => {
        const userMessage = inputMessage.trim() || "No user input provided";
        const fullMessage = `${userMessage}\n\nFile Content:\n${fileContent}`;

        if (!fullMessage) {
            return; // Prevent sending empty messages
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: userMessage },
        ]);

        setInputMessage(""); // Clear input field
        setIsLoading(true); // Set loading state to true

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [{ text: fullMessage }],
                            },
                        ],
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            if (data && data.candidates && data.candidates[0]) {
                const botMessage =
                    data.candidates[0].content.parts[0].text || "No response text available.";
                typeResponse(botMessage); // Call typing animation for bot response
            } else {
                throw new Error("Unexpected API response structure.");
            }
        } catch (error) {
            console.error("Error communicating with the API:", error.message);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Sorry, there was an issue with the API response." },
            ]);
        } finally {
            setIsLoading(false); // Set loading state to false once the request is done
        }
    };


    const typeResponse = (responseText) => {
        const formattedText = applyFormatting(responseText); // Apply formatting rules
        const words = formattedText.split(" "); // Split into words for typing effect
        let index = 0;
        const typingInterval = 50; // Time interval for each word (in ms)

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "" }, // Start with an empty bot message
        ]);

        const intervalId = setInterval(() => {
            if (index < words.length) {
                setMessages((prevMessages) => {
                    const lastMessage = prevMessages[prevMessages.length - 1];
                    const updatedText = `${lastMessage.text} ${words[index]}`.trim();
                    return [
                        ...prevMessages.slice(0, -1), // Keep all previous messages except the last
                        { sender: "bot", text: updatedText }, // Update the last message with new word
                    ];
                });
                index++;
            } else {
                clearInterval(intervalId); // Stop the typing animation once all words are typed
            }
        }, typingInterval);
    };

    const applyFormatting = (text) => {
        // Highlight text enclosed in double asterisks (**text**)
        text = text.replace(/\*\*(.*?)\*\*/g, (match, content) => {
            return `<span class="highlight">${content}</span>`;
        });

        // Bold text enclosed in single asterisks (*text*)
        text = text.replace(/\*(.*?)\*/g, (match, content) => {
            return `<strong>${content}</strong>`;
        });

        // Handle newline for `any message*second message` pattern
        text = text.replace(/(.*?)\*(.*?)($|\s)/g, (match, firstPart, secondPart) => {
            return `${firstPart}<br/>${secondPart}`;
        });

        return text;
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;

            if (fileType === "application/pdf") {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const pdfText = await extractTextFromPDF(e.target.result);
                    setFileContent(pdfText);
                };
                reader.readAsArrayBuffer(file);
            } else if (
                fileType ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
                try {
                    const result = await mammoth.extractRawText({ arrayBuffer: file });
                    setFileContent(result.value);
                } catch (error) {
                    console.error("Error extracting text from DOC file:", error);
                }
            } else {
                alert("Please upload a PDF or DOC file.");
            }
        }
    };

    const extractTextFromPDF = async (pdfData) => {
        const pdfDocument = await pdfjsLib.getDocument({ data: pdfData }).promise;
        let text = "";
        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            const content = await page.getTextContent();
            const pageText = content.items.map((item) => item.str).join(" ");
            text += pageText + " ";
        }
        return text;
    };

    return (
        <div className="chat-container">
            <h1 style={{display:'flex',justifyContent:"center"}}>AI Career Guidance</h1>
            <div className="chat-history" ref={chatHistoryRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.sender}`}
                        style={{
                            textAlign: msg.sender === "user" ? "right" : "left",
                            margin: "10px",
                        }}
                    >
                        <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
                        <div
                            dangerouslySetInnerHTML={{ __html: msg.text }} // Render formatted text
                        />
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{ width: "100%" }}
            />

            <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                style={{ marginTop: "10px" }}
            />

            <button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
            </button>
        </div>
    );
};

export default Chatbot;
