export default `<p class="text-h5 mb-2">Hi! Thank you for agreeing to take the test assignment for the position
    Frontend Developer (VueJS). We hope to see you soon at the technical interview</p>
  <p class="text-h5 mt-6 mb-2">SquareGPS test task</p>
  <p class="ma-0">You need to use <span
    class="font-weight-bold">Vuejs, Vuex, VueRouter, Vuetify</span> to write an application.<br>
    The header of the application should contain a menu of 2 items: <span
      class="font-weight-bold">Task description</span> and <span
      class="font-weight-bold">Map</span>.<br>
    The main part of the application should display the contents of the sections.
  </p>
  <p class="text-h6 mt-5 mb-2 font-weight-regular">
    Section “Task description”
  </p>
  <p class="ma-0">
    The section should contain the text of this task, laid out similarly.
  </p>
  <p class="text-h6 mt-5 mb-2 font-weight-regular">
    Section “Map”
  </p>
  <p class="ma-0">
    There should be a map and a list on the screen (see example):
  </p>
  <ol class="pl-0 mb-5">
    <li>When you click on the add button, the map should switch to the mode of adding a marker: in
      place
      a marker should appear after the click, and an entry with the address of the point should
      appear in the list
    </li>
  </ol>
  <p class="mb-5">
    To search for an address, you can use any free API for geocoding, for example:
    <a href="https://geocode.maps.co/">https://geocode.maps.co/</a>
  </p>
  <p class="mb-5">
    If the address is not found, it is necessary to output an error and not add a marker to
    list.
  </p>
  <ol class="pl-0 pb-10" start="2">
    <li>When clicking on the marker, an entry in the list should be highlighted</li>
    <li>When clicking on an entry in the list, the map should be centered on the marker</li>
    <li>Markers should be stored locally and not disappear after the page is reloaded</li>
    <li>The address bar should display the id of the selected marker</li>
  </ol>
  <p class="mb-5">
    Local data storage should be organized in the form of a service that emulates the backend.
    (A Backend class is needed that pseudo-asynchronously stores data in localStorage)
  </p>
  <p class="ma-0">
    <span class="font-weight-bold">Additionally:</span>
  </p>
  <ol>
    <li>Think through the display on mobile devices</li>
    <li>Provide localization</li>
    <li>It is necessary to use jest to write 1 unit test for any component</li>
  </ol>`;
