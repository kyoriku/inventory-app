// Defining a function called formatDate which takes a timestamp parameter
function formatDate(timestamp) {
  // Defining options for formatting the date of the timestamp
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  // Defining options for formatting the time of the timestamp
  // const timeOptions = {
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   hour12: true
  // }

  // Creating a new Date object from the provided timestamp
  const date = new Date(timestamp);
  // Formatting the date of the timestamp using the defined date options
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  // Formatting the time of the timestamp using the defined time options
  // const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
  // Returning a string that combines the formatted date and time
  // return `${formattedDate} at ${formattedTime}`;
  return `${formattedDate}`;
}

// Exporting the formatDate function to make it available for use in other modules
module.exports = formatDate;