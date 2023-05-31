$(function () {
  // Display current day on page
  $("#currentDay").text(dayjs().format('MMMM D, YYYY'));

  // Load any saved data from localStorage
  $(".time-block").each(function () {
      var id = $(this).attr("id");
      var schedule = localStorage.getItem(id);

      if (schedule !== null) {
          $(this).children(".description").val(schedule);
      }
  });

  // Save data to localStorage
  $(".saveBtn").on("click", function () {
      var time = $(this).parent().attr("id");
      var schedule = $(this).siblings(".description").val();

      localStorage.setItem(time, schedule);
  });

  // Function to update colors
  function updateColors() {
      var currentHour = dayjs().hour();

      // Loop over time blocks
      $(".time-block").each(function () {
          var blockHour = parseInt($(this).attr("id").split("-")[1]);

          // Check the time and add the classes for background indicators
          if (blockHour < currentHour) {
              $(this).removeClass("future");
              $(this).removeClass("present");
              $(this).addClass("past");
          } else if (blockHour === currentHour) {
              $(this).removeClass("past");
              $(this).removeClass("future");
              $(this).addClass("present");
          } else {
              $(this).removeClass("past");
              $(this).removeClass("present");
              $(this).addClass("future");
          }
      });
  }

  // Update colors every minute
  setInterval(updateColors, 60000);

  // Run functions initially
  updateColors();
});
