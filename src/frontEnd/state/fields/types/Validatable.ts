export type Validatable = {
    

}

/*
Two cases, fields whose validity is immediately knowable, and fields whose validity takes time to determine.

For the latter case, a field's validity may be being determined, and prior to determination finishing, the field changes again,
so when it comes back as valid / invalid that may no longer apply. 

Of that case, we may be able to say "if the field was valid with value x, and we change to y, and it starts verifying, but before it can,
we revert to value x, we can assume validity again"; but if the fields validity could depend on other factors, then that assumption could also be wrong.

We can start with the assumptions that maximally simplify and then introduce complexity to work through this case. We also have the case
where we change values, or attempt to anyway, and then validity takes time, and application may take additional time, where either could work / fail,
and other things could happen in the meantime.

--
Before we event get into validatable, let us address "missing", "default" or "unexpected error" type synchronous field reads/writes
based on what is already there. For that, we can look at both the pure data, field, and ui perspectives.

UI
- what to do if there is no value? just use a placeholder value? where does it come from?
- are there cases today of a field where when I write the value, i cannot get the same value back? (for example, array field for missing record)

FIELD
- get value
    - unexpected errors - a field on a missing match on an array. should indicate this to the ui? should auto create? (thinking: no?)
    - no unexpected error - depending on the type of field, we want to have the behavior that, either:
        - we can return undefined / null / value and count on shitty code to handle that
        - we can return a Maybe<T>
        - we can have fields that definitely provide values (perhaps these fields just wrap Maybe fields and provide a default value)
        - we can invent an Either<Left, Right> where "Right" is the "Right" type and if we don't get that type then we have some error case Left
          which can be a union of however many types may be needed to express the error

another issue: distinguishing
"default value" (which is displayed if "nothing" is in the state, but is not actually stored in the state)
from a "placeholder".

Let's take a field that ideally would produce a string. It can produce empty string or non empty. It can produce null or undefined. It can
also, depending on how the field is defined, possibly throw an error (such as a field that operates on a matching record based on a predicate
over an array)...

Immediately knowable. Let's assume we have a Validatable & Field:




field could be invalid (but ui was never interacted with, so may not want to show any error until user has done something)
field is known valid
field was known valid but it (or something else) was changed, and its validity is unknown (but will become known in the future)
*/
