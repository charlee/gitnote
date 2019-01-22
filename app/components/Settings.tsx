import * as React from "react";

import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({});

type State = {};

class Settings extends React.Component<WithStyles<typeof styles>, State> {
  render() {
    return <div>Settings</div>;
  }
}

export default withStyles(styles)(Settings);
