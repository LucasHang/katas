# Introduction and Goals

This repository main goal is to provide to me a space for praticing already known languages, but also learn new ones through the method of Kata (like a one person coding dojo).

I realized that it would be a good idea when I was driving home and I asked myself **"How the components of a car would be best represented in code?"**.
<br />
It happens that at that time I was reading Pragmatic Programming and was really motivated to learn more every day. So here it is!

## Quality Goals

To develop the proposed kata using all principles of Clean Architecture, focusing:

- Readability
- Testability
- Orthogonality

## Proposed Kata

It will be a car-environment kata, simulating almost all interactions you can have inside and outside a car, focusing the ones tha offers complex relations to extreme exercise the best pratices of programming.

Here you have a list of all business rules the algorithm should satisfy _(the level of details should not be too high, letting the developer decide the best way of execution)_:

- A car starts locked, turned off and stoped
- A car can be unlocked using a key
  - Inserting it into the keyhole
  - Pressing the unlock button
- A door can be open when the car is unlocked
- A car can be turned on inserting the key in the keyhole
- Air conditioner system can only be activated when the car is turned on
  - The fan speed can be turned on in 4 degrees of speed
  - The temperature can be changed respecting a limit of cold and hot degrees
  - The temperature starts the way it was left the last time air conditioner was active
  - The direction of the air can be chosen between `front`, `down`, `front-down` and `up-front`
  - The outside air entrance can be toggled on/off
  - The air conditioner cool function can be toggled on/off
  - The outside air entrance can not be turned on when the air direction is `up-front`
  - The air conditioner cool function starts the way it was left the last time air conditioner was active
  - The air conditioner is only active if fan speed is turned on
- Windshield wiper can only be activated when the car is turned on
  - Wipers have 2 context of speed (one being faster then the other)
  - Inside each context it has 4 others levels of speed
- When the windshield water system is activated the wipers must wipe 3 times (in the current speed) and stop

_...that's all for now folks, should already give a lot of work..._
