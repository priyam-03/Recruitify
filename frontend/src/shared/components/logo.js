import { styled } from "@mui/material";
import { useEffect, useState } from "react";

const LogoWrapper = styled("div")(({ height, width, borderRadius, selectedAnimation }) => {
    const computedBorderRadius = borderRadius && !isNaN(borderRadius) ? `${borderRadius}px` : "0";

    return {
        display: "block",
        // justifyContent: "center",
        // alignItems: "center",
        width: width || "100vw",
        height: height || "100vh",
        maxWidth: "100%",
        margin: "0 auto",
        padding: "0",
        border: "none",
        backgroundColor: "#0C1D36",
        borderRadius: computedBorderRadius,
        animation: selectedAnimation,
        "@keyframes loadEffect": {
            "0%": {
                transform: "scale(1)",
                opacity: "1"
            },
            "50%": {
                transform: "scale(1.05)",
                opacity: "0.5"
            },
            "100%": {
                transform: "scale(1)",
                opacity: "1"
            }
        },
        "@keyframes bounceEffect": {
            "0%, 100%": {
                transform: "scale(1)",
                opacity: "1"
            },
            "50%": {
                transform: "scale(1.1)",
                opacity: "0.8"
            }
        },
        "@keyframes pulseEffect": {
            "0%, 100%": {
                transform: "scale(1)",
                opacity: "1"
            },
            "50%": {
                transform: "scale(1.05)",
                opacity: "0.6"
            }
        },
        "@keyframes slideInEffect": {
            "0%": {
                transform: "translateY(-50px)",
                opacity: "0"
            },
            "100%": {
                transform: "translateY(0)",
                opacity: "1"
            }
        },
        "@keyframes zoomInEffect": {
            "0%": {
                transform: "scale(0.8)",
                opacity: "0"
            },
            "100%": {
                transform: "scale(1)",
                opacity: "1"
            }
        },
        "@keyframes fadeSlideInLeft": {
            "0%": {
                transform: "translateX(-50px)",
                opacity: "0"
            },
            "100%": {
                transform: "translateX(0)",
                opacity: "1"
            }
        },
        "@keyframes popInEffect": {
            "0%": {
                transform: "scale(0.8)",
                opacity: "0"
            },
            "70%": {
                transform: "scale(1.1)",
                opacity: "1"
            },
            "100%": {
                transform: "scale(1)",
                opacity: "1"
            }
        }
    };
});

const Logo = ({ logoSrc, height, width, borderRadius, applyAnimation }) => {
    const [selectedAnimation, setSelectedAnimation] = useState("");

    useEffect(() => {
        if (applyAnimation) {
            const animations = [
                "loadEffect 1s ease-in-out forwards",
                "bounceEffect 1s ease-in-out forwards",
                "pulseEffect 1s ease-in-out infinite",
                "slideInEffect 1s ease-in-out forwards",
                "zoomInEffect 1s ease-in-out forwards",
                "fadeSlideInLeft 1s ease-in-out forwards",
                "popInEffect 0.5s ease-in-out forwards"
            ];

            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            setSelectedAnimation(randomAnimation);
        }
    }, [applyAnimation]);

    return (
        <LogoWrapper
            height={height}
            width={width}
            borderRadius={borderRadius}
            selectedAnimation={selectedAnimation}
        >
            <img src={logoSrc} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </LogoWrapper>
    );
};

export default Logo;


