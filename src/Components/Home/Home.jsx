import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Card, CardContent, Container, Grid } from "@mui/material"
import { School, TrendingUp, Work } from "@mui/icons-material"
import AnimatedConversation from "./AnimatedConversation"
import Header from "../Header/Header";
import { useAuth, useUser } from '@clerk/clerk-react'


export default function Home() {
    const navigate = useNavigate();
    const {userId}=useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Simulating authentication check
    useEffect(() => {
        // Replace this with your actual authentication logic
        const checkAuth = () => {
            const token = localStorage.getItem("authToken")
            setIsAuthenticated(!!token)
                console.log(userId  )
        }
        checkAuth()
    }, [])

    const handleChatbotClick = () => {
        if (isAuthenticated) {
            navigate("/Chatbot")
        } else {
            navigate("/auth/sign-in")
        }
    }

    return (
        <>
            <Header />
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Container component="main" sx={{ flexGrow: 1, py: 8 }}>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: "center", marginBottom: "4rem" }}
                    >
                        <Typography variant="h2" component="h1" gutterBottom>
                            Discover Your Ideal Career Path
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Let our AI-powered guidance system help you navigate your professional journey.
                        </Typography>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Button variant="contained" size="large" onClick={handleChatbotClick}>
                                Get Started
                            </Button>
                        </motion.div>
                    </motion.div>

                    <Grid container spacing={4} sx={{ mb: 8 }}>
                        {[
                            { icon: School, title: "Personalized Learning Paths" },
                            { icon: TrendingUp, title: "Career Trend Analysis" },
                            { icon: Work, title: "Job Market Insights" },
                        ].map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card>
                                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                                            <feature.icon sx={{ fontSize: 48, mb: 2, color: "primary.main" }} />
                                            <Typography variant="h6" component="h3" gutterBottom>
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" align="center">
                                                Leverage AI-driven insights to make informed career decisions.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    <Typography variant="h3" component="h2" align="center" gutterBottom>
                        Experience AI Career Guidance
                    </Typography>
                    <Card sx={{ maxWidth: 600, mx: "auto" }}>
                        <CardContent>
                            <AnimatedConversation onClick={handleChatbotClick} />
                        </CardContent>
                    </Card>
                </Container>

                <footer style={{ backgroundColor: "#f5f5f5", padding: "1.5rem 0" }}>
                    <Container>
                        <Typography variant="body2" color="text.secondary" align="center">
                            © 2025 AI Career Guidance. All rights reserved.
                        </Typography>
                    </Container>
                </footer>
            </div>
        </>
    )
}

