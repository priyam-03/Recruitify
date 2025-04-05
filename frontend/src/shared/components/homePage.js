import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../../styles/homePage.module.css";

const HomePage = () => {
  const [contributors, setContributors] = useState([]);

  const technologies = [
    {
      name: "React",
      iconUrl:
        "https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png",
    },
    {
      name: "Node.js",
      iconUrl:
        "https://pluspng.com/img-png/nodejs-png-nodejs-icon-png-50-px-1600.png",
    },
    {
      name: "Express",
      iconUrl:
        "https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png",
    },
    {
      name: "MongoDB",
      iconUrl:
        "https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/erkxwhl1gd48xfhe2yld",
    },
    { name: "Material UI", iconUrl: "https://mui.com/static/logo.png" },
    {
      name: "Python",
      iconUrl: "https://openastronomy.org/pyastro/images/pyastro_logo.svg",
    },
    {
      name: "Flask",
      iconUrl:
        "https://static.javatpoint.com/tutorial/flask/images/flask-tutorial.png",
    },
    { name: "Vercel", iconUrl: "https://egw2023.eurac.edu/favicon.ico" },
    {
      name: "Redis",
      iconUrl:
        "https://microstream.one/blog/wp-content/uploads/2023/06/redis_logo-1.png",
    },
    {
      name: "AWS",
      iconUrl:
        "https://cdn.iconscout.com/icon/free/png-256/free-aws-3215369-2673787.png",
    },
    {
      name: "Docker",
      iconUrl:
        "https://cdn.icon-icons.com/icons2/2699/PNG/512/docker_tile_logo_icon_168248.png",
    },
    {
      name: "WebSocket",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/WebSocket-logo.svg/1200px-WebSocket-logo.svg.png",
    },
    {
      name: "WebRTC",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/WebRTC.png/1200px-WebRTC.png",
    },
    {
      name: "GraphQL",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg",
    },
    {
      name: "Graph Database",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Neo4j-logo.png/1200px-Neo4j-logo.png",
    },
    {
      name: "Vector Database",
      iconUrl: "https://vector-database.io/static/media/logo.6c8b8e2e.svg",
    },
  ];

  const features = [
    {
      title: "Find Your Dream Jobs",
      description:
        "Explore a wide range of job listings tailored to your skills and preferences. Discover opportunities that align with your career goals and aspirations.",
    },
    {
      title: "Build Your Profile",
      description:
        "Create a compelling profile that showcases your skills, experience, and achievements. Stand out to potential employers with a well-crafted resume and portfolio.",
    },
    {
      title: "Post Your Progress",
      description:
        "Share your career milestones and achievements with your network. Keep track of your progress and stay motivated as you advance in your professional journey.",
    },
    {
      title: "Give Interview",
      description:
        "Prepare for interviews with our comprehensive resources and mock interview tools. Gain confidence and ace your interviews with ease.",
    },
    {
      title: "Grow Your Network",
      description:
        "Connect with industry professionals, peers, and mentors. Expand your network and build valuable relationships that can help you advance in your career.",
    },
    {
      title: "Directly Chat with Recruiters",
      description:
        "Engage in direct conversations with recruiters and hiring managers. Get instant feedback and stay informed about new job opportunities.",
    },
  ];

  useEffect(() => {
    // Fetch the contributors from the GitHub API
    fetch("https://api.github.com/repos/priyam-03/Recruitify/contributors")
      .then((response) => response.json())
      .then((data) => {
        // Map the fetched data to your desired format
        const formattedContributors = data.map((contributor) => ({
          name: contributor.login, // Use contributor's login as name
          role: "Contributor", // Assign a default role or customize it
          github: contributor.html_url, // GitHub profile URL
          image: contributor.avatar_url, // Avatar URL
        }));
        setContributors(formattedContributors);
      })
      .catch((error) => {
        console.error("Error fetching contributors:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <Typography variant="h4" component="h1" className={styles.heading}>
          Welcome to Recruitify
        </Typography>
        <Typography variant="body1" paragraph className={styles.paragraph}>
          Recruitify is your ultimate job search companion. Whether you're
          looking to advance your career or build a strong portfolio, Recruitify
          has you covered. Our platform is designed to help you find your dream
          job, build an impressive profile, and connect directly with
          recruiters. Here’s how we can help you:
        </Typography>
      </div>

      <Grid container spacing={4} className={styles.gridContainer}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={styles.featureCard}>
              <CardContent className={styles.featureCardContent}>
                <Typography
                  variant="h6"
                  component="h2"
                  className={styles.featureTitle}
                >
                  {feature.title}
                </Typography>
                <Typography className={styles.featureCardDesc}>
                  {" "}
                  {feature.description}
                </Typography>
              </CardContent>
              <ExpandMoreIcon className={styles.expandMoreIcon} />
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className={styles.technologiesSection}>
        <h1 className={styles.technologiesSectionHeading}>Technologies Used</h1>
        <div className={styles.gridContainer2}>
          {technologies.map((tech, index) => (
            <div className={styles.techCard} key={index}>
              <img
                src={tech.iconUrl}
                alt={tech.name}
                className={styles.techIcon}
              />
              <div className={styles.techName}>{tech.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contributors}>
        <Typography
          variant="h5"
          component="h2"
          className={styles.contributorsHeading}
        >
          Meet Our Contributors
        </Typography>

        <Grid container spacing={6} className={styles.gridContainer2}>
          {contributors.map((contributor, index) => (
            <Grid item xs={4} sm={3} md={1.7} key={index}>
              <div
                className={styles.contributorCard}
                onClick={() => window.open(contributor.github, "_blank")}
              >
                <img
                  src={contributor.image}
                  alt={contributor.name}
                  className={styles.contributorImage}
                />
                <div className={styles.contributorName}>{contributor.name}</div>
                {/* <Typography variant="h6" component="h3" className={styles.contributorName}>
                  {contributor.name}
                </Typography> */}
              </div>
            </Grid>
          ))}
        </Grid>
        <footer className={styles.footer}>
          <Typography align="center" color="#c5c5c5">
            © 2024 - {new Date().getFullYear()} Recruitify. All rights reserved.
          </Typography>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
