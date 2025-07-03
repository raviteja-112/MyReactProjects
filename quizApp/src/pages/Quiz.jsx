import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
  Alert,
  AlertTitle,
  Slide,
} from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const questions = useRef([]);
  const hasFetched = useRef(false);
  const retryCount = useRef(0);

  const category = queryParams.get('category') || 9;
  const difficulty = queryParams.get('difficulty') || 'medium';
  const amount = queryParams.get('amount') || 10;

  useEffect(() => {
    const fetchQuestions = async () => {
      if (hasFetched.current || questions.current.length > 0) return;

      const getQuestions = async (retries) => {
        try {
          const response = await fetch(
            `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
          );

          if (!response.ok) {
            if (response.status === 429 && retries < 3) {
              const waitTime = Math.min(2 ** retries * 1000, 10000);
              console.log(`Rate limited. Retrying in ${waitTime}ms...`);
              await new Promise(res => setTimeout(res, waitTime));
              return getQuestions(retries + 1);
            } else if (response.status === 429) {
              throw new Error('Too many requests. Please wait a moment before trying again.');
            } else {
              throw new Error('Failed to load questions. Please try again.');
            }
          }

          const data = await response.json();
          const shuffledResults = data.results.map(q => ({
            ...q,
            shuffled_answers: shuffleAnswers(q)
          }));
          return shuffledResults;
        } catch (err) {
          throw err;
        }
      };

      try {
        const results = await getQuestions(retryCount.current);
        questions.current = results;
        setLoading(false);
        hasFetched.current = true;
        retryCount.current = 0;
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      hasFetched.current = false;
      retryCount.current = 0;
    };
  }, [category, difficulty, amount]);

  useEffect(() => {
    if (questions.current.length > 0 && timerActive) {
      const timer = timeLeft > 0 && setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      if (timeLeft === 0) {
        handleNextQuestion();
      }

      return () => clearInterval(timer);
    }
  }, [timeLeft, timerActive]);

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    setTimerActive(false);

    if (answer === questions.current[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.current.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(15);
      setTimerActive(true);
    } else {
      const quizResult = {
        score,
        total: questions.current.length,
        category: decodeHtml(questions.current[0].category),
        difficulty,
        date: new Date().toISOString(),
      };

      const storedResults = JSON.parse(localStorage.getItem('quizHighScores')) || [];
      storedResults.push(quizResult);
      localStorage.setItem('quizHighScores', JSON.stringify(storedResults));

      navigate('/results', { state: { score, total: questions.current.length } });
    }
  };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const shuffleAnswers = (question) => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">Loading questions...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <AlertTitle>Error</AlertTitle>
          <Typography variant="body1" sx={{ mb: 2 }}>{error}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  if (questions.current.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <AlertTitle>No Questions</AlertTitle>
          <Typography variant="body1">No questions available. Please try different settings.</Typography>
        </Alert>
      </Container>
    );
  }

  const currentQuestion = questions.current[currentQuestionIndex];
  const answers = currentQuestion.shuffled_answers;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Question {currentQuestionIndex + 1} of {questions.current.length}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessAlarmIcon sx={{ mr: 0.5, color: 'primary.main' }} />
                <Typography variant="subtitle1" color="text.secondary">{timeLeft}s</Typography>
              </Box>
              <Typography variant="subtitle1" color="text.secondary">
                Score: {score}/{questions.current.length}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={((currentQuestionIndex + 1) / questions.current.length) * 100}
              sx={{ height: 8, borderRadius: 5, mb: 4 }}
            />

            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
              {decodeHtml(questions.current[currentQuestionIndex].question)}
            </Typography>

            <Box sx={{ '& > :not(style)': { mb: 2 } }}>
              {answers.map((answer, index) => {
                let buttonColor = 'primary';
                let buttonVariant = 'outlined';
                let startIcon = null;

                if (isAnswered) {
                  if (answer === currentQuestion.correct_answer) {
                    buttonColor = 'success';
                    buttonVariant = 'contained';
                    startIcon = <CheckCircleOutlineIcon />;
                  } else if (answer === selectedAnswer && answer !== currentQuestion.correct_answer) {
                    buttonColor = 'error';
                    buttonVariant = 'contained';
                    startIcon = <HighlightOffIcon />;
                  } else {
                    buttonVariant = 'outlined';
                    buttonColor = 'inherit';
                  }
                }

                return (
                  <Button
                    key={index}
                    fullWidth
                    variant={buttonVariant}
                    color={buttonColor}
                    onClick={() => handleAnswerSelect(answer)}
                    disabled={isAnswered}
                    startIcon={startIcon}
                    sx={{
                      justifyContent: 'flex-start',
                      py: 1.5,
                      px: 2,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&.Mui-disabled': {
                        opacity: 0.7,
                        color: buttonColor === 'inherit' ? 'text.disabled' : undefined,
                        borderColor: buttonColor === 'inherit' ? 'action.disabledBackground' : undefined,
                      }
                    }}
                  >
                    {decodeHtml(answer)}
                  </Button>
                );
              })}
            </Box>

            {isAnswered && (
              <Alert
                severity={currentQuestion.correct_answer === selectedAnswer ? "success" : "error"}
                sx={{ mt: 4, p: 2, borderRadius: 2 }}
              >
                <AlertTitle>{currentQuestion.correct_answer === selectedAnswer ? "Correct!" : "Incorrect"}</AlertTitle>
                {currentQuestion.correct_answer === selectedAnswer
                  ? "Well done."
                  : `The correct answer was: ${decodeHtml(currentQuestion.correct_answer)}`}
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleNextQuestion}
              disabled={!isAnswered && timeLeft > 0}
              sx={{ mt: 4, py: 1.5, borderRadius: 2 }}
            >
              {currentQuestionIndex < questions.current.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          </CardContent>
        </Card>
      </Slide>
    </Container>
  );
};

export default Quiz;
