import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../../styles/homePage.module.css";

const HomePage = () => {
  const [contributors, setContributors] = useState([]);
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
            <Card  className={styles.featureCard}>
              <CardContent className={styles.featureCardContent}>
                <Typography
                  variant="h6"
                  component="h2"
                  className={styles.featureTitle}
                >
                  {feature.title}
                </Typography>
                <Typography className={styles.featureCardDesc}> {feature.description}</Typography>
              </CardContent>
              <ExpandMoreIcon className={styles.expandMoreIcon} />
            </Card>
          </Grid>
        ))}
      </Grid>

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
          <Typography  align="center" color='#c5c5c5'>
            © {new Date().getFullYear()} Recruitify. All rights reserved.
          </Typography>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
