import React from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";

export const DeleteTooltip = ({onClick}) => {
  return (
    <Grid.Container
      css={{
        borderRadius: "14px",
        padding: "0.75rem",
        maxWidth: "330px",
      }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row>
        <Text>
          Bạn có chắc chắn xóa truyện không! Các chương của truyện cũng sẽ mất!
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button size="sm" light>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button onClick={onClick} size="sm" shadow color="error">
            Delete
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};