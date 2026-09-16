(() => {
  const entries = document.querySelector("#journal-entries");
  const journalEntries = window.PANDA_JOURNAL?.entries;
  if (!entries || !journalEntries) return;

  const fragment = document.createDocumentFragment();
  journalEntries.forEach((entry) => {
    const article = document.createElement("article");
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const body = document.createElement("div");

    article.className = "journal-entry";
    body.className = "journal-entry__body";
    summary.append(entry.title, Object.assign(document.createElement("span"), { textContent: "+" }));

    entry.paragraphs.forEach((paragraph) => {
      const text = document.createElement("p");
      text.textContent = paragraph;
      body.append(text);
    });

    details.append(summary, body);
    article.append(details);
    fragment.append(article);
  });

  entries.replaceChildren(fragment);
})();
