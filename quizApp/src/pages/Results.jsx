import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Slide,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 10 } = location.state || {};

  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('quizHighScores')) || [];
    setHighScores(storedResults.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const percentage = Math.round((score / total) * 100);

  const getResultMessage = () => {
    if (percentage >= 80) return "Excellent! You're a quiz master!";
    if (percentage >= 60) return "Good job! You know your stuff.";
    if (percentage >= 40) return "Not bad! Keep practicing.";
    return "Keep trying! You'll get better.";
  };

  const getResultColor = () => {
    if (percentage >= 80) return "success.main";
    if (percentage >= 60) return "info.main";
    if (percentage >= 40) return "warning.main";
    return "error.main";
  };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handleDeleteScore = (indexToDelete) => {
    const updatedScores = highScores.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('quizHighScores', JSON.stringify(updatedScores));
    setHighScores(updatedScores);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
              <CircularProgress
                variant="determinate"
                value={percentage}
                size={120}
                thickness={5}
                sx={{ color: getResultColor() }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" component="div" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                  {`${percentage}%`}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              {getResultMessage()}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              You scored {score} out of {total} questions correctly.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                sx={{ borderRadius: 2, py: 1.5, px: 3 }}
              >
                Home
              </Button>

              <Button
                variant="contained"
                color="primary"
                startIcon={<ReplayIcon />}
                onClick={() => navigate('/quiz')}
                sx={{ borderRadius: 2, py: 1.5, px: 3 }}
              >
                Try Again
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Slide>

      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <EmojiEventsIcon sx={{ mr: 1, color: 'warning.main' }} />
              High Scores
            </Typography>

            <List sx={{ '& > :not(style)': { mb: 1 } }}>
              {highScores.length > 0 ? (
                highScores.map((result, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteScore(index)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{ bgcolor: 'grey.100', borderRadius: 1, boxShadow: 1, py: 1.5, px: 2 }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                          {decodeHtml(result.category)} - {result.difficulty.charAt(0).toUpperCase() + result.difficulty.slice(1)}
                        </Typography>
                      }
                      secondary={new Date(result.date).toLocaleString()}
                    />
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold', mr: 2 }}>
                      {result.score}/{result.total}
                    </Typography>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 3 }}>
                  No high scores yet. Play a quiz to see your results here!
                </Typography>
              )}
            </List>
          </CardContent>
        </Card>
      </Slide>
    </Container>
  );
};

export default Results;
