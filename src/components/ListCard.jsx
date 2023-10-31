import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ListCard(props) {
  return (
    <>
      <Accordion sx={{ boxShadow: "2px 5px 2px #f0f0f0" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="flex-start"
            alignItems="center"
          >
            <img src={props.imgurl} alt="" width="50em" height="50em" />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                fontFamily: "Frank Ruhl Libre",
              }}
            >
              {props.headline}
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", fontFamily: "Public Sans" }}
          >
            {"Tags: " + props.tags}
          </Typography>
          <Typography
            variant="body2"
            color="secondary"
            mt="1em"
            sx={{ fontFamily: "Public Sans", fontWeight: "600" }}
          >
            {"Source: " + props.src}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
