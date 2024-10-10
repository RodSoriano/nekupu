# Structure

The idea behind this project is to be as simple as possible. It will show a _"feel-like"_ static application that will serve as a single page to do multiple interactions in the form of sections, with a twist, basically fitting everything in the `index.html`.

## Secciones:


*_all this can be subject to change and only is here to have some documentation._*


- *Header*:
  - *Search Bar*:
    - *Row 1*: Search input
    - *Row 2*: Suggestions list
    - *Row 3*: Button (place according to design)
  - *Logo* (location pending)

- *Main*:
  - *Motto*:
    - *Row 1*: Site title
    - *Row 2*: Description

  - *Posts (GRID)*:
    - *Post (show)*:
      - *Row 1*: Image (low resolution to optimize loading)
      - *Row 2*: Post title
      - *Row 3*: Short description
      - *Row 4*: Categories
      - *Row 5*: Location (City, Country)

  - *Map (box)*:
    - *Header*:
      - *Row 1*: Map title
    - *Box (expandable)*:
      - *Row 1*: Button to close
      - *Row 2*: Interactive map
      - *Row 3*: Place name, option to copy coordinates, open in Google Maps, or show real-time location (to be defined)
      - *Row 4*: Location pin on the map

  - *Chat*:
    - *Box (expandable)*:
      - *Row 1*: Chat box
      - *Row 2*: "Chat" button

      #### Component (chat window):
      - *Row 1*: Message list
        #### Component (message):
        - *Row 1*: User flag and name
        - *Row 2*: Message
      - *Row 2*: Input to write message and button to send

  - *Contact*:
    - *Form*:
      - Name
      - Phone
      - Email
      - Button to send
## Components

- `input: icon?, placeholder, type(num, string), name`
- `list: records->{title, body, id, model}, regex?`
- `box: height, width, background-color, border, border-color`

## Routes

- `/` (home)
- `/posts/:id`
- `/search?title=input1&tag=input2` (need sanitize)

## Scripts

```
ng serve                               # serve app port 4200
ng generate component component-name   # generate new component
ng build                               # build project
ng test                                # execute test via karma
ng e2e                                 # execute end-to-end tests
```

For the last command, you need to first add a package that implements end-to-end testing capabilities.
