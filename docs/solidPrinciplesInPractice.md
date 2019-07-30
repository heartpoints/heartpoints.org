SOLID PRINCIPLES
================

These are principles that may help guide modular, flexible, easily unit / integration testable deesigns

See: [SOLID Wikipedia Page](https://en.wikipedia.org/wiki/SOLID)

SOLID IN PRACICE
================

For a given entity, define its Single Responsibility, Make sure it is Open For Extension but closed for Editing,
Make sure the interfaces it depends on are as simple as possible, making it obvious to the user how to fill the intent based
on interface names and structures used. Depend on abstractions, not implementations - so whatever functions or
react components or other things you wish to work with, allow those to be passed in, and if not by the most natural, direct caller,
than by using closure to ensure the remaining concretions are passed in by someone better suited (based on *their* single responsibility)
to provide them.