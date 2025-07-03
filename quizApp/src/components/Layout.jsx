import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../main';

const Layout = ({ children }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            QuizMaster
          </Typography>
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/quiz" startIcon={<QuestionMarkIcon />}>
            Quiz
          </Button>
          <Button color="inherit" component={Link} to="/results" startIcon={<EmojiEventsIcon />}>
            Results
          </Button>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
