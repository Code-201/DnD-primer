# Software Requirements

## Vision

Minimum Length: 3-5 sentences

**What is the vision of this product?**

To provide a beginner friendly tutorial and interactive walk through a DnD scenario. The user will get to learn about what DnD is, a brief overview of game mechanics. The user will also get to learn about character creation.

**What pain point does this project solve?**

A lot of people interested in playing Dnd don't know where to start. Our app will reduce beginner anxiety of learning to play the game. Most DnD communities aren't very open to newcomers, so making a virtual learning experience allows for more accessibility.

**Why should we care about your product?**

DnD is fun and it encourages creativity, especially during a time where many are kept inside due to the pandemic. DnD is a great team building exercise and allows for online socializing during unprecedented times. These reasons make it even more important for the DnD community to be made more accessible to those who might not have the resources.

## Scope (In/Out)

**IN - What will your product do**

**Describe the individual features that your product will do.**

- An introduction

- Character creation

- Character local storage

- Introductory scenario

**High overview of each. Only need to list 4-5**

- The introduction will give a general overview of what DnD is, when it was created and what the point of the game is. The introduction will also give credit to game creators and state the purpose of the application.

- Character creation will take the player through the process of getting stats and building a first-level character. Users will get two class options for the purpose of this tutorial, but they will be provided with information on additional class options in their introduction to the game.

- As users create their characters, character data will be stored locally. By doing this, users can close or refesh their browser and return to the game to continue their tutorial session.

- Users will be directed to navigate through a town, find themselves at a weapons shop and will be able to select their weapons of choice. As they do, so they will get to see how the game functions and be exposed to several kinds of game mechanics.

**OUT - What will your product not do.**

- Our product will not give players a substitute for an actual gaming experience.

- Players will not be able to move freely throughout the scenario.

- Players will not have full access to all information available in the player's handbook.

**Minimum Viable Product vs**

What will your MVP functionality be?

Three pages:

- Landing page with introduction and navigation to next pages.

- Character creation page with example character sheet, selectable attributes and ability to randomly select stats.

- Scenario page with information and prompt for action from a given list of choices and ability to randomly determine outcomes.

**Stretch**

What stretch goals are you going to aim for?

- Graphical animations of dice using CSS

- Game background graphics

- Character graphics

- Clickable graphics to interact with in-game events

- Author easter eggs 

## Functional Requirements

- User can create or delete character

- Store/Recall character data in local storage

- User input to advance through scenario

## Data Flow

1. User arrives at webpage.  Receives an introduction to the site.

1. User determines whether to **create** or a **local stored** character.

1. If **create** a character - navigate to character creation page.

1. if **local stored** proceed directly to *scenario* page.

1. **create** user selects: *Race* and *Type*.  Rolls for stats (6 total stats)

1. **scenario** user begins scenario in a town and tasked with slaying a ***Dragon***.  User goes to a weapons store and armor store

1. selects from options available at each store.

1. Encounters ***Dragon*** and begins battle

1. Player completes battle **wins** or **loses**.  Character info saved.

1. If **win** a victory page/popup.  Then return to landing page

1. If **lose** a lose page/popup.  Return to landing page or restart battle.
