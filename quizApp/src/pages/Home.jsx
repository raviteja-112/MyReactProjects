import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const categories = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Entertainment: Books' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' },
  { id: 13, name: 'Entertainment: Musicals & Theatres' },
  { id: 14, name: 'Entertainment: Television' },
  { id: 15, name: 'Entertainment: Video Games' },
  { id: 16, name: 'Entertainment: Board Games' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Science: Computers' },
  { id: 19, name: 'Science: Mathematics' },
  { id: 20, name: 'Mythology' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 25, name: 'Art' },
  { id: 26, name: 'Celebrities' },
  { id: 27, name: 'Animals' },
  { id: 28, name: 'Vehicles' },
  { id: 29, name: 'Entertainment: Comics' },
  { id: 30, name: 'Science: Gadgets' },
  { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
  { id: 32, name: 'Entertainment: Cartoon & Animations' },
];

const difficulties = ['easy', 'medium', 'hard'];

const Home = () => {
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState('medium');
  const [amount, setAmount] = useState(10);
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz?category=${category}&difficulty=${difficulty}&amount=${amount}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Quiz Settings
            </Typography>

            <Box sx={{ '& > :not(style)': { mb: 3 } }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl component="fieldset" fullWidth>
                <Typography variant="subtitle1" component="legend" sx={{ mb: 1 }}>Difficulty</Typography>
                <RadioGroup
                  row
                  aria-label="difficulty"
                  name="difficulty-radio-buttons-group"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  sx={{ justifyContent: 'space-around' }}
                >
                  {difficulties.map((diff) => (
                    <FormControlLabel
                      key={diff}
                      value={diff}
                      control={<Radio />}
                      label={diff.charAt(0).toUpperCase() + diff.slice(1)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Number of Questions: {amount}
                </Typography>
                <Slider
                  value={amount}
                  onChange={(_, newValue) => setAmount(newValue)}
                  aria-labelledby="input-slider"
                  valueLabelDisplay="auto"
                  min={5}
                  max={20}
                  step={1}
                  marks={[
                    { value: 5, label: '5' },
                    { value: 10, label: '10' },
                    { value: 15, label: '15' },
                    { value: 20, label: '20' },
                  ]}
                />
              </Box>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                onClick={startQuiz}
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              >
                Start Quiz
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Slide>

      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              How to Play
            </Typography>
            <List>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Select your preferred category and difficulty." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Choose the number of questions (5-20)." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Answer each question within the quiz." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Review your results at the end." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Try to beat your high score!" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Slide>
    </Container>
  );
};

export default Home;
