import * as React from "react";
import { Link } from 'react-router-dom';
import {
  createStyles,
  withStyles,
  Theme,
  WithStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NewIcon from '@material-ui/icons/BookOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';

import routes from '../constants/routes';
import NewNotebookDialog from '../components/NewNotebookDialog';

const drawerWidth = 240;

const styles = ({ mixins, spacing }: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },

    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...mixins.toolbar
    },

    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },

    main: {
      marginTop: mixins.toolbar.minHeight,
      padding: spacing.unit * 2
    }
  });

interface State {
  open: boolean;
  newNotebookDialogOpen: boolean;
};

class App extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    open: false,
    newNotebookDialogOpen: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleOpenNewNotebookDialog = () => {
    console.log('open dialog');
    this.setState({ newNotebookDialogOpen: true, open: false });
  }

  handleNotebookDialogClose = () => {
    this.setState({ newNotebookDialogOpen: false });
  }

  render() {
    const { children, classes } = this.props;
    const { open, newNotebookDialogOpen } = this.state;
    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Git Notes
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          open={open}
          onClose={this.handleDrawerClose}
          className={classes.drawer}
          classes={{
            paper: classes.drawer
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <List>
              <ListItem button onClick={this.handleOpenNewNotebookDialog}>
              <ListItemIcon>
                <NewIcon />
              </ListItemIcon>
              <ListItemText>New Notebook</ListItemText>
            </ListItem>

            <Link to={routes.SETTINGS}>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </ListItem>
            </Link>
          </List>
        </Drawer>

        <main className={classes.main}>{children}</main>
        <NewNotebookDialog open={newNotebookDialogOpen} onClose={this.handleNotebookDialogClose}/>
        
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
