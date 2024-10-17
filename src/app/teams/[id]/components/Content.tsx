import {
  Box,
  Grid2,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { TeamOut } from "../schemas";

interface Props {
  item: TeamOut;
}

const Content: React.FC<Props> = ({ item }) => {
  const status = 1;
  const steps = [
    { no: "组人中", yes: "已成组" },
    { no: "待确认", yes: "已确认" },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
        }}
      >
        <Grid2
          container
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "8px 4px",
          }}
        >
          <Grid2 size={3}>
            <Typography
              variant="subtitle1"
              sx={{
                borderRight: "1px solid grey",
                padding: "2px 0",
              }}
            >
              {item.clientType}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography
              variant="subtitle1"
              sx={{
                padding: "2px 0",
              }}
            >
              {item.teamType}
            </Typography>
          </Grid2>
          <Grid2 size={3}>
            <Typography
              variant="subtitle1"
              sx={{
                borderLeft: "1px solid grey",
                padding: "2px 0",
              }}
            >
              {item.level}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          m: 0.5,
          p: 1,
        }}
      >
        <Stepper activeStep={status} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography
                  variant="body2"
                  sx={{
                    color: status > index ? "green" : "red",
                  }}
                >
                  {status > index ? label.yes : label.no}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

export default Content;
