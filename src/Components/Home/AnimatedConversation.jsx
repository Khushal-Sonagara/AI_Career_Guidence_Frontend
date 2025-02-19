import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography, Box } from "@mui/material"

// AnimatedConversation Component
const conversation = [
  { text: "What career paths are suitable for someone with a background in computer science?", isUser: true },
  {
    text: "With a background in computer science, you have many exciting career paths to choose from. Some popular options include:",
    isUser: false,
  },
  {
    text: "1. Software Developer\n2. Data Scientist\n3. AI/Machine Learning Engineer\n4. Cybersecurity Specialist\n5. Cloud Computing Engineer",
    isUser: false,
  },
  { text: "Can you tell me more about the job market for AI engineers?", isUser: true },
  {
    text: "The job market for AI engineers is currently very strong and growing rapidly. Here are some key points:",
    isUser: false,
  },
  {
    text: "1. High demand across industries\n2. Competitive salaries\n3. Opportunities in tech giants and startups\n4. Continuous learning and innovation\n5. Global job opportunities",
    isUser: false,
  },
  { text: "What skills should I focus on to become a successful data scientist?", isUser: true },
  {
    text: "To become a successful data scientist, you should focus on developing the following skills:",
    isUser: false,
  },
  {
    text: "1. Programming (Python, R)\n2. Statistical analysis\n3. Machine learning algorithms\n4. Data visualization\n5. Big data technologies\n6. Domain knowledge\n7. Communication skills",
    isUser: false,
  }
]

export default function AnimatedConversation({ onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < conversation.length - 1) {
        setIsTyping(true)
        setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1)
          setIsTyping(false)
        }, 1500)
      } else {
        setCurrentIndex(0)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <Box
      sx={{
        height: 320,
        overflowY: "auto",
        cursor: "pointer",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
        },
      }}
      onClick={onClick}
    >
      <AnimatePresence>
        {conversation.slice(0, currentIndex + 1).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: message.isUser ? "flex-end" : "flex-start",
              marginBottom: "0.5rem",
            }}
          >
            <Box
              sx={{
                maxWidth: "80%",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                backgroundColor: message.isUser ? "primary.main" : "grey.200",
                color: message.isUser ? "primary.contrastText" : "text.primary",
              }}
            >
              <Typography variant="body2">{message.text}</Typography>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Box
            sx={{
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
              backgroundColor: "grey.200",
            }}
          >
            <Typography variant="body2" className="typing-animation">
              ...
            </Typography>
          </Box>
        </motion.div>
      )}
    </Box>
  )
}