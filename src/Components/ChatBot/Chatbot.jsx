// import React, { useState, useRef, useEffect } from "react";
// import mammoth from "mammoth"; // For DOC files
// import * as pdfjsLib from "pdfjs-dist";

// // Set the path to the worker (CDN version)
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//     "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]); // Chat history
//     const [inputMessage, setInputMessage] = useState(""); // User input
//     const [isLoading, setIsLoading] = useState(false); // Loading state
//     const [fileContent, setFileContent] = useState(""); // Extracted file content
//     const api_key = import.meta.env.VITE_APP_AI_CAREER_GUIDANCE_GOOGLE_API_KEY

//     const chatHistoryRef = useRef(null); // Reference for chat history container

//     // Scroll to the bottom of the chat when a new message is added
//     useEffect(() => {
//         if (chatHistoryRef.current) {
//             chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
//         }
//     }, [messages]); // Runs every time messages change

//     const handleSendMessage = async () => {
//         const userMessage = inputMessage.trim() || "No user input provided";
//         const fullMessage = `${userMessage}\n\nFile Content:\n${fileContent}`;

//         if (!fullMessage) {
//             return; // Prevent sending empty messages
//         }

//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: "user", text: userMessage },
//         ]);

//         setInputMessage(""); // Clear input field
//         setIsLoading(true); // Set loading state to true

//         try {
//             const response = await fetch(
//                 `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         contents: [
//                             {
//                                 parts: [{ text: fullMessage }],
//                             },
//                         ],
//                     }),
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("API Response:", data);

//             if (data && data.candidates && data.candidates[0]) {
//                 const botMessage =
//                     data.candidates[0].content.parts[0].text || "No response text available.";
//                 typeResponse(botMessage); // Call typing animation for bot response
//             } else {
//                 throw new Error("Unexpected API response structure.");
//             }
//         } catch (error) {
//             console.error("Error communicating with the API:", error.message);
//             setMessages((prevMessages) => [
//                 ...prevMessages,
//                 { sender: "bot", text: "Sorry, there was an issue with the API response." },
//             ]);
//         } finally {
//             setIsLoading(false); // Set loading state to false once the request is done
//         }
//     };


    //     const typeResponse = (responseText) => {
    //         const formattedText = applyFormatting(responseText); // Apply formatting rules
    //         const words = formattedText.split(" "); // Split into words for typing effect
    //         let index = 0;
    //         const typingInterval = 50; // Time interval for each word (in ms)

    //         setMessages((prevMessages) => [
    //             ...prevMessages,
    //             { sender: "bot", text: "" }, // Start with an empty bot message
    //         ]);

    //         const intervalId = setInterval(() => {
    //             if (index < words.length) {
    //                 setMessages((prevMessages) => {
    //                     const lastMessage = prevMessages[prevMessages.length - 1];
    //                     const updatedText = `${lastMessage.text} ${words[index]}`.trim();
    //                     return [
    //                         ...prevMessages.slice(0, -1), // Keep all previous messages except the last
    //                         { sender: "bot", text: updatedText }, // Update the last message with new word
    //                     ];
    //                 });
    //                 index++;
    //             } else {
    //                 clearInterval(intervalId); // Stop the typing animation once all words are typed
    //             }
    //         }, typingInterval);
    //     };

//     const applyFormatting = (text) => {
//         // Highlight text enclosed in double asterisks (**text**)
//         text = text.replace(/\*\*(.*?)\*\*/g, (match, content) => {
//             return `<span class="highlight">${content}</span>`;
//         });

//         // Bold text enclosed in single asterisks (*text*)
//         text = text.replace(/\*(.*?)\*/g, (match, content) => {
//             return `<strong>${content}</strong>`;
//         });

//         // Handle newline for `any message*second message` pattern
//         text = text.replace(/(.*?)\*(.*?)($|\s)/g, (match, firstPart, secondPart) => {
//             return `${firstPart}<br/>${secondPart}`;
//         });

//         return text;
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     const handleFileUpload = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const fileType = file.type;

//             if (fileType === "application/pdf") {
//                 const reader = new FileReader();
//                 reader.onload = async (e) => {
//                     const pdfText = await extractTextFromPDF(e.target.result);
//                     setFileContent(pdfText);
//                 };
//                 reader.readAsArrayBuffer(file);
//             } else if (
//                 fileType ===
//                 "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             ) {
//                 try {
//                     const result = await mammoth.extractRawText({ arrayBuffer: file });
//                     setFileContent(result.value);
//                 } catch (error) {
//                     console.error("Error extracting text from DOC file:", error);
//                 }
//             } else {
//                 alert("Please upload a PDF or DOC file.");
//             }
//         }
//     };

//     const extractTextFromPDF = async (pdfData) => {
//         const pdfDocument = await pdfjsLib.getDocument({ data: pdfData }).promise;
//         let text = "";
//         for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
//             const page = await pdfDocument.getPage(pageNum);
//             const content = await page.getTextContent();
//             const pageText = content.items.map((item) => item.str).join(" ");
//             text += pageText + " ";
//         }
//         return text;
//     };

//     return (
//         <div className="chat-container">
//             <h1 style={{display:'flex',justifyContent:"center"}}>AI Career Guidance</h1>
//             <div className="chat-history" ref={chatHistoryRef}>
//                 {messages.map((msg, index) => (
//                     <div
//                         key={index}
//                         className={`chat-message ${msg.sender}`}
//                         style={{
//                             textAlign: msg.sender === "user" ? "right" : "left",
//                             margin: "10px",
//                         }}
//                     >
//                         <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
//                         <div
//                             dangerouslySetInnerHTML={{ __html: msg.text }} // Render formatted text
//                         />
//                     </div>
//                 ))}
//             </div>

//             <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 style={{ width: "100%" }}
//             />

//             <input
//                 type="file"
//                 accept=".pdf,.docx"
//                 onChange={handleFileUpload}
//                 style={{ marginTop: "10px" }}
//             />

//             <button onClick={handleSendMessage} disabled={isLoading}>
//                 {isLoading ? "Sending..." : "Send"}
//             </button>
//         </div>
//     );
// };

// export default Chatbot;
"use client"

import { useState, useRef, useEffect } from "react";
import mammoth from "mammoth"; // For DOCX file processing
import { PlusCircle } from "lucide-react";
import { pdfjs } from "react-pdf";

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const api_key = import.meta.env.VITE_APP_AI_CAREER_GUIDANCE_GOOGLE_API_KEY;

  const chatHistoryRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const userMessage = inputMessage.trim() || "No user input provided";
    const fullMessage = `${userMessage}\n\nFile Content:\n${fileContent}`;

    if (!fullMessage) return;

    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: userMessage }]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: fullMessage }] }] }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const botMessage = data.candidates[0].content.parts[0].text;
        typeResponse(botMessage);
      } else {
        throw new Error("Unexpected API response structure.");
      }
    } catch (error) {
      console.error("Error communicating with API:", error.message);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Sorry, there was an issue with the API response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const typeResponse = (responseText) => {
    const formattedText = applyFormatting(responseText);
    const words = formattedText.split(" ");
    let index = 0;
    const typingInterval = 50;

    setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "" }]);

    const intervalId = setInterval(() => {
      if (index < words.length) {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const updatedText = `${lastMessage.text} ${words[index]}`.trim();
          return [...prevMessages.slice(0, -1), { sender: "bot", text: updatedText }];
        });
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, typingInterval);
  };

  const applyFormatting = (text) => {
    return (
      text
        // Handle numbered lists (1., 2., etc.)
        .replace(/^(\d+\.\s)/gm, "<br/>$1")
        // Handle bullet points (-, *, •)
        .replace(/^([-*•]\s)/gm, "<br/>$1")
        // Handle Roman numerals (I., II., III., etc.)
        .replace(/^([IVX]+\.\s)/gm, "<br/>$1")
        // Handle lettered lists (A., B., etc.)
        .replace(/^([A-Z]\.\s)/gm, "<br/>$1")
        // Handle section headers with colons
        .replace(/^([A-Z][^:]*:)\s*$/gm, "<br/><strong>$1</strong><br/>")
        // Handle double line breaks
        .replace(/\n\n/g, "<br/><br/>")
        // Handle single line breaks
        .replace(/\n/g, "<br/>")
        // Handle bold text with **
        .replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>')
        // Handle italic text with *
        .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>")
        // Clean up multiple consecutive <br/> tags
        .replace(/(<br\/>){3,}/g, "<br/><br/>")
        // Remove leading <br/> if it exists
        .replace(/^<br\/>/, "")
    )
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setFileContent(result.value);
        setFileName(file.name);
      } catch (error) {
        console.error("Error extracting text from DOCX file:", error);
        alert("Error processing DOCX file. Please try another file.");
      }
    } else {
      alert("Only DOCX files are allowed.");
      setFileName("");
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    alert("Only DOCX files are allowed.");
    fileInputRef.current.click();
  };

  return (
    <div className="chat-app">
      <div className="chat-container">
        <div className="chat-history" ref={chatHistoryRef}>
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>AI Career Guidance</h2>
              <p>Hey, How can I help you today?</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
              <div className="message-bubble">
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message bot-message">
              <div className="message-bubble typing">
                <span className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>
            </div>
          )}
        </div>

        {fileName && <p className="file-name">Uploaded: {fileName}</p>}

        <div className="input-container">
          <div className="input-wrapper">
            <button className="attachment-button" onClick={triggerFileInput} aria-label="Attach file">
              <PlusCircle size={24} />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Explore SkillOrbit"
              className="message-input"
            />
            <button className="send-button" onClick={handleSendMessage} disabled={isLoading}>Generate</button>
          </div>
          <input ref={fileInputRef} type="file" accept=".docx" onChange={handleFileUpload} className="file-input" />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
