Editable Fields
===============

When displaying fields (images, text, numbers) that may be editable, we use something which composes the view only and edit views.

Image Field
-----------

<EditableImage isEditable={true} field={field} mode="view" />

    isEditable:
        if true:
            view mode:
                a small, semitransparent edit icon exists within the image. Upon hover, it becomes opaque. upon
                clicking, it should change the mode from "edit" to "view".
            edit mode: irrelevant
        if false:
            if in view mode: show nothing (just view)
            if in edit mode: show an error message
    mode: 
        view: shows the view mode of the control
        edit: shows the edit mode of the control

<EditableText isEditable={true} field={field} mode="edit" />

    isEditable:
        if true:
            view mode: show an edit icon to the right of the text
            edit mode: irrelevant
        if false:
            view mode: nothing
            edit: show an error
    
# UI vs. Non-UI State

Do I want every user of an editable field to have to listen for the various things that can be requested? For example,
when I am viewing something editable, I can click or otherwise request to switch to view mode. Does the user of the 
component have to set that up, including storing the current mode of that exact UI component in the state tree?

Adding complexity, say I am editing a field. As I update the field, my changes may need to be validated, which 
may or may not be asynchronous. I can continue to make changes while validation has not completed. Perhaps I want
a way to undo / cancel the changes vs. apply them. Unless I apply, the field does not receive changes. Perhaps I cannot 
apply until validated? Perhaps I do not validate until attempting to apply? Perhaps I apply immediately sometimes?