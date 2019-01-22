import * as React from "react";
import * as Electron from "electron";
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
  Button
} from "@material-ui/core";

type State = {
  name: string;
  directory: string;
};

const styles = ({ spacing }: Theme) =>
  createStyles({
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end"
    },

    directoryInput: {
      flex: 1,
      marginRight: spacing.unit
    },

    browseButtonContainer: {
      marginBottom: 4
    }
  });

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: Function;
}

class NewNotebookDialog extends React.Component<Props, State> {
  state = {
    name: "",
    directory: ""
  };

  handleCreate = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
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
        properties: ["openDirectory"]
      }
    );

    if (dirs && dirs.length) {
      this.setState({ directory: dirs[0] });
    }
  };

  handleChange = (key: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [key]: event.target.value } as Pick<State, keyof State>);
  };

  render() {
    const { classes, open } = this.props;
    const { name, directory } = this.state;

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
              value={name}
              onChange={this.handleChange("name")}
            />
          </div>
          <div className={classes.row}>
            <TextField
              className={classes.directoryInput}
              margin="dense"
              id="directory"
              label="Create under directory"
              fullWidth
              value={directory}
              onChange={this.handleChange("directory")}
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
