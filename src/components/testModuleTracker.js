function Form() {
  const getUserLocation = (onSuccess) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
        console.error(error);
      });
    } else {
      console.log("Browser doesn't support Geolocation");
    }
  };
  function trackerList() {
    setTimeout(() => {
      this.saveCoordinates();
    }, 5000);
    // setInterval(() => {
    //   this.saveCoordinates();
    // }, 10000);
  }

  async function saveCoordinates() {
    const date = new Date();
    const time = date.toLocaleTimeString();
    getUserLocation((location) =>
      this.tList.push({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        time,
      })
    );
    await this.trackerList();
  }

  return <div>1</div>;
}

export default Form;
