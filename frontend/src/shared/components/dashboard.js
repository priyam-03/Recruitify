import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../styles/dashboard.module.css';

const Dashboard = () => {
  const features = [
    {
      title: 'Find Your Dream Jobs',
      description: 'Explore a wide range of job listings tailored to your skills and preferences. Discover opportunities that align with your career goals and aspirations.',
    },
    {
      title: 'Build Your Profile',
      description: 'Create a compelling profile that showcases your skills, experience, and achievements. Stand out to potential employers with a well-crafted resume and portfolio.',
    },
    {
      title: 'Post Your Progress',
      description: 'Share your career milestones and achievements with your network. Keep track of your progress and stay motivated as you advance in your professional journey.',
    },
    {
      title: 'Give Interview',
      description: 'Prepare for interviews with our comprehensive resources and mock interview tools. Gain confidence and ace your interviews with ease.',
    },
    {
      title: 'Grow Your Network',
      description: 'Connect with industry professionals, peers, and mentors. Expand your network and build valuable relationships that can help you advance in your career.',
    },
    {
      title: 'Directly Chat with Recruiters',
      description: 'Engage in direct conversations with recruiters and hiring managers. Get instant feedback and stay informed about new job opportunities.',
    },
  ];

  const contributors = [
    {
      name: 'Tarik Anowar',
      role: 'Fullstack Developer',
      github: 'https://github.com/Tarik-Anowar',
      image: 'https://scontent.fccu3-1.fna.fbcdn.net/v/t39.30808-6/290496233_808802003881839_8707127559745044958_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Q7k1lRgpX0YQ7kNvgFViNQR&_nc_ht=scontent.fccu3-1.fna&oh=00_AYA8kOCwqipZzynNKNBMNLPSWH1_zCg6Zci0SLooM_QvUw&oe=66D42ADE'
    },
    {
      name: 'Priyam Saha',
      role: 'Fullstack Developer',
      github: 'https://github.com/priyam-03',
      image: 'https://scontent.fccu3-1.fna.fbcdn.net/v/t39.30808-6/369702882_319467353951605_6058001924302475669_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vkTpqaeDvUcQ7kNvgG8QCiJ&_nc_ht=scontent.fccu3-1.fna&oh=00_AYB__C2p2HYtp1rw3klGgWOL3BXumtd-3yHeaG5auwITzA&oe=66D41E5F'
    }
  ];


  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <Typography variant="h4" component="h1" className={styles.heading}>
          Welcome to Recruitify
        </Typography>
        <Typography variant="body1" paragraph className={styles.paragraph}>
          Recruitify is your ultimate job search companion. Whether you're looking to advance your career or build a strong portfolio, Recruitify has you covered. Our platform is designed to help you find your dream job, build an impressive profile, and connect directly with recruiters. Here’s how we can help you:
        </Typography>
      </div>

      <Grid container spacing={4} className={styles.gridContainer}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={styles.featureCard}>
              <CardContent className={styles.featureCardContent}>
                <Typography variant="h6" component="h2" className={styles.featureTitle}>
                  {feature.title}
                </Typography>
                <Typography variant="body2">
                  {feature.description}
                </Typography>
              </CardContent>
              <ExpandMoreIcon className={styles.expandMoreIcon} />
            </Card>
          </Grid>
        ))}
      </Grid>

      <div className={styles.contributors}>
        <Typography variant="h5" component="h2" className={styles.contributorsHeading}>
          Meet Our Creators
        </Typography>
        <br/>
        <br/>
        <Grid container spacing={4} className={styles.gridContainer}>
          {contributors.map((contributor, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={styles.contributorCard}>
                <CardContent className={styles.contributorCardContent}>
                  <img
                    src={contributor.image}
                    alt={contributor.name}
                    className={styles.contributorImage} // Add CSS class for styling
                  />
                  <Typography variant="h6" component="h3" className={styles.contributorName}>
                    {contributor.name}
                  </Typography>
                  <Typography variant="body2" className={styles.contributorRole}>
                    {contributor.role}
                  </Typography>
                  <a
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    GitHub Profile
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <footer className={styles.footer}>
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} Recruitify. All rights reserved.
          </Typography>
        </footer>
      </div>

      <div className={styles.restArea}>
        HellO Tarik
      </div>
    </div>
  );
};

export default Dashboard;
