import { Grid } from "@chakra-ui/react";
import InfoCard from "./InfoCard";
import StudentlineChart from "./StudentLineChart";

const StudentDashoard = (props) => {
  const{user} = props
  return (
    <>
    <InfoCard user={user} />

    <Grid
          templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
          templateRows={{ lg: "repeat(2, auto)" }}
          gap="20px"
        >
    <StudentlineChart />

        </Grid>

      
    </>
  );
};

export default StudentDashoard;
{
  /* {" "}
<Spacer />
<Spacer />

   */
}