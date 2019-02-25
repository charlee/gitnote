import * as React from 'react';
import * as _ from 'lodash';
import * as Electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as Git from 'nodegit';

import {
  createStyles,
  withStyles,
  Theme,
  WithStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';
import { FormState, WithErrors, FormStateError } from '../types';

interface State extends FormState {
  name: string;
  directory: string;
}

type StateWithError = WithErrors<State>;

const styles = ({ spacing }: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    directoryInput: {
      flex: 1,
      marginRight: spacing.unit,
    },

    browseButtonContainer: {
      marginBottom: 4,
    },
  });

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: Function;
}

class NewNotebookDialog extends React.Component<Props, StateWithError> {
  state: StateWithError = {
    name: '',
    directory: '',
    errors: {
      name: '',
      directory: '',
    },
  };

  handleCreate = async () => {
    const { onClose } = this.props;
    const { name, directory } = this.state;

    const errors: FormStateError<State> = {};

    // Check if directory and name are entered
    if (!name) {
      errors.name = 'Notebook name is required.';
    }

    if (!directory) {
      errors.directory = 'Directory name is required.';
    } else {

    }

    // Check if selected directory exists
    if (!errors.directory) {
      try {
        fs.statSync(directory);
      } catch (err) {
        if (err.code === 'ENOENT') {
          errors.directory = 'Directory does not exist';
        }
      }
    }

    const pathName = path.join(directory, name);
    // Check if name exists
    if (!errors.directory && !errors.name) {
      try {
        fs.statSync(pathName);
        errors.name = 'Notebook already exists';
      } catch (err) {
        if (err.code !== 'ENOENT') {
          errors.name = 'Notebook already exists';
        }
      }
    }

    if (!_.isEmpty(errors)) {
      this.setState({ errors });
    } else {
      // Create the notebook
      try {
        fs.mkdirSync(pathName);
        if (onClose) {
          onClose();
        }
      } catch (err) {
        window.alert(`Unknown error: ${err}`);
      }
    }
  };

  handleCancel = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  handleBrowse = () => {
    const dirs = Electron.remote.dialog.showOpenDialog(
      Electron.remote.getCurrentWindow(),
      {
        properties: ['openDirectory'],
      },
    );

    if (dirs && dirs.length) {
      this.setState({ directory: dirs[0] });
    }
  };

  getErorrMessage(key: keyof FormStateError<State>) {
    return this.state.errors[key];
  }

  handleChange = (key: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ [key]: event.target.value } as Pick<State, keyof State>);
  };

  render() {
    const { classes, open } = this.props;
    const { name, directory, errors } = this.state;

    return (
      <Dialog open={open}>
        <DialogTitle>Create New Notebook</DialogTitle>
        <DialogContent>
          <div className={classes.row}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Notebook Name"
              fullWidth
              error={Boolean(errors.name)}
              helperText={this.getErorrMessage('name')}
              value={name}
              onChange={this.handleChange('name')}
            />
          </div>
          <div className={classes.row}>
            <TextField
              className={classes.directoryInput}
              margin="dense"
              id="directory"
              label="Create under directory"
              fullWidth
              error={Boolean(errors.directory)}
              helperText={this.getErorrMessage('directory')}
              value={directory}
              onChange={this.handleChange('directory')}
            />
            <div className={classes.browseButtonContainer}>
              <Button
                variant="contained"
                color="default"
                onClick={this.handleBrowse}
              >
                Browse
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleCancel}
            color="default"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleCreate}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewNotebookDialog);
