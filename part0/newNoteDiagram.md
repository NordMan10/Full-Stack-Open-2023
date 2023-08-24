```mermaid
newNoteDiagram
	participant browser
	participant server
	
	browser-->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	
	Note right of server: The server pushes to its `notes` array new element with the taken data and send the browser to the "/notes" page

	server-->>browser: HTML document
	deactivate server

```
