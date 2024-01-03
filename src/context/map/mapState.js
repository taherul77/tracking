import MapContext from "./mapContext";
const MapState = (props) => {

  const singleEmp = async (selectedEmployeeId) => {
    const authToken = localStorage.getItem("Token");
    console.log("eid", id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API}/empTrackInfo/findAllTrackInfosByEmpNo/${selectedEmployeeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.json();
  };
  return (
    <MapContext.Provider value={singleEmp}>
      {props.children}
    </MapContext.Provider>
  );
};
export default MapState;
