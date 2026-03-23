# Infinite Scroll Test Cases

| TC ID | Scenario | Steps | Expected Result | Priority |
|-------|----------|-------|-----------------|----------|
| TC-001 | Verify initial content loads when page opens | 1. Navigate to https://the-internet.herokuapp.com/infinite_scroll<br>2. Observe the page heading<br>3. Observe the content paragraphs visible without scrolling | Page heading "Infinite Scroll" is displayed and at least one content paragraph is visible in the viewport | High |
| TC-002 | Verify more content loads after scrolling down | 1. Navigate to https://the-internet.herokuapp.com/infinite_scroll<br>2. Count the number of content paragraphs visible initially<br>3. Scroll to the bottom of the page<br>4. Wait for new content to load<br>5. Count the number of content paragraphs again | The number of content paragraphs after scrolling is greater than the initial count, confirming new content was dynamically appended | High |
