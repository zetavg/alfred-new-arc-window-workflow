/**
 * This is a JavaScript for Automation (JXA) script, it should be run with /usr/bin/osascript (JavaScript).
 *
 * The content is copy-pasted into the Alfred Workflow.
 */

(() => {
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;
  const ARC_STORABLE_SIDEBAR_FILE_PATH = `${app.systemAttribute(
    'HOME',
  )}/Library/Application Support/Arc/StorableSidebar.json`;

  const storableSidebarJsonContent =
    $.NSString.stringWithContentsOfFileEncodingError(
      $(ARC_STORABLE_SIDEBAR_FILE_PATH).stringByStandardizingPath,
      $.NSUTF8StringEncoding,
      $(),
    ).js;

  const storableSidebar = JSON.parse(storableSidebarJsonContent);

  const spaceNames = storableSidebar.sidebar.containers[1].spaces.flatMap(
    space => {
      if (typeof space !== 'object') return [];
      return [space.title];
    },
  );

  const items = spaceNames.map(name => ({
    title: name,
    subtitle: `New Arc window with space ${name}`,
    arg: name,
  }));

  items.push({
    title: 'New Space…',
    subtitle: 'Create a new space',
    arg: 'New Space…',
  });

  return JSON.stringify({ items });
})();
