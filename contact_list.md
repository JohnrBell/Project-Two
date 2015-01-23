# Contact List

A contact list is an application that allows users to store and organize their contacts.

## *MVP*

- **Data Model:**
  - The models used in the application are `Contact` and `Category`
  - `Contact` attributes:
    - Name
    - Age
    - Address
    - Phone Number
    - Picture
    - Category_id
  - `Category` attributes:
    - Name
- **Required Technologies or Features**:
  - AJAX
  - [Random User API](http://randomuser.me/)
- **Optional Technologies of Features**
  - jQuery
  - Backbone.js
  - Google Maps API
  - [Bootstrap](http://getbootstrap.com/) or [Foundation](http://foundation.zurb.com/)
- **User Stories(MVP)**
  - A user can have three categories of contact lists
    - Example: `Friends`, `Family`, and `Work`
  - A user can create new contacts
  - A user can update and delete existing contacts
  - A user can move contacts between list categories (ie from `Work` to `Friends`)
  - A user can assign a random image to contact when creating it
    - This should use the Random User API
  - A user can search through their contacts for a specific contact
  - A user will see an error if they have entered incomplete information
    - Example: If a user enters Name, Age, Address, and Picture but forgets to enter Phone Number, they will see an error message

## *Themes*
- Think of a fun/interesting theme that can be applied throughout the project
- Possible Themes
  - Hunger Games
    - Contact Lists
      - Victors
      - Current Tributes
      - Deceased Tributes
  - Star Wars
    - Contact Lists
      - Jedi
      - Sith
      - Bounty Hunters

## *Bonus*
- **Drag and Drop**
  - A user can drag and drop contacts to different lists.
  - This will trigger a change in the database to persist the fact that the category has been changed
  - Possible tools to use:
    - [jQuery UI](http://jqueryui.com/)
    - [HTML5](http://blog.teamtreehouse.com/implementing-native-drag-and-drop)
    - [Drag.js](http://alogicalparadox.com/drag.js/)
- **Google Maps API**
  - Use AJAX to hit the Google Maps API
  - Inside a modal, show a map of the user's contacts
- **UI Improvements**
  - *Fading*
    - Instead of just having new list items appear when creating contacts, have them fade in
    - When deleting contacts, have them fade out
    - Docs: [CSS3 Transitions](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions) or [jQuery Fade](http://api.jquery.com/category/effects/fading/)
  - *Animations*
    - Use Javascript, DOM manipulation, and/or CSS to improve user experience with animations
    - Docs: [CSS3 Transitions](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions) or [jQuery .animate](http://api.jquery.com/animate/)
  - *Splash Page*
    - A lot of websites currently use a splash page and/or full page video as an intro to the site. You then enter the site by clicking a button to proceed.
    - Implement one. However, after the user clicks the button, have it fade out and then have the contact list fade in.
    - Do NOT lose the "single page" nature of your application when doing this
- **Smart Search**
  - When a user is searching for a contact, have the search filter on keydown
  - What does this mean?
    - Go to [Hulu.com](http://www.hulu.com/) and pay attention to what happens as you start typing in the search box
