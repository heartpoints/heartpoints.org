import * as React from 'react';
import { fieldSetChildStyle } from './fieldSetChildStyle';

/*
1. when user first navigates to createOrganization, we should create a new unsaved organization in the organizations array
2. changing the values in this form change those values instantly
3. clicking the button saves those values

i want a way, from the outside, to bind this form to an "Organization Model" instance,
from that, the form can read as well as update the properties just using plain old getters and setters, but where
the setter implies a rerender will occur (not a mutation).

ideally, for each field, i can also understand, is it valid? has it changed from its earlier version? if not valid, what is wrong? how do i show that?
maybe for a field i need a way to "clear" it (return it back to its default, without knowing what that may be?)

for "create new", the "new" org is just one that gets added to the orgs list
    - if we navigate away, what happens (navTo, otherwise)
    - do we only give an href upon save? Or perhaps we create it with an href and immediately show the edit view?

1. for now let's just put a "possibleNewOrg" field in the state that has all the org fields in it
2. rewire this view to update those fields and then submit the new org therefrom
3. create the edit org view by maximally reusing whats here

*/

export const InputForField = 
    ({ value, setValue, placeholder }) => 
    <input style={fieldSetChildStyle} type="text" {...{ value, setValue, placeholder }} />
