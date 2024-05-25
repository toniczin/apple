export const breakpointMaxWidthL = 1440;
export const breakpointMaxWidthM = 1068;
export const breakpointMaxWidthS = 734;

export const SECTION = {};

export function breakPointWidth() {
  return (window.innerWidth < breakpointMaxWidthS)
          ? 'mo'
          : (window.innerWidth < breakpointMaxWidthM)
          ? 'tb'
          : 'pc';
}


export function updateMediaSrc(bp, lPath, mPath, sPath) {
  let path;
  switch(bp) {
    case 'pc': path = lPath; break;
    case 'tb': path = mPath; break;
    case 'mo': path = sPath; break;
  }

  return path;
}

export const hightlightsSlideData = [
  {
    tag: 'chip',
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance.",
    ],
    videoPath: {
      pc: '/assets/imgs/highlights/highlights-chip-large.mp4',
      tb: '/assets/imgs/highlights/highlights-chip-medium.mp4',
      mo: '/assets/imgs/highlights/highlights-chip-small.mp4',
    },
    imagePath: {
      pc: '/assets/imgs/highlights/highlights_chip_endframe_large.jpg',
      tb: '/assets/imgs/highlights/highlights_chip_endframe_medium.jpg',
      mo: '/assets/imgs/highlights/highlights_chip_endframe_small.jpg',
    },
  },
  {
    tag: 'titanium',
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    videoPath: {
      pc: '/assets/imgs/highlights/highlights-titanium-large.mp4',
      tb: '/assets/imgs/highlights/highlights-titanium-medium.mp4',
      mo: '/assets/imgs/highlights/highlights-titanium-small.mp4',
    },
    imagePath: {
      pc: '/assets/imgs/highlights/highlights_titanium_endframe_large.jpg',
      tb: '/assets/imgs/highlights/highlights_titanium_endframe_medium.jpg',
      mo: '/assets/imgs/highlights/highlights_titanium_endframe_small.jpg',
    },
  },
  {
    tag: 'zoom',
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    videoPath: {
      pc: '/assets/imgs/highlights/highlights-zoom-large.mp4',
      tb: '/assets/imgs/highlights/highlights-zoom-medium.mp4',
      mo: '/assets/imgs/highlights/highlights-zoom-small.mp4',
    },
    imagePath: {
      pc: '/assets/imgs/highlights/highlights_zoom_endframe_large.jpg',
      tb: '/assets/imgs/highlights/highlights_zoom_endframe_medium.jpg',
      mo: '/assets/imgs/highlights/highlights_zoom_endframe_small.jpg',
    },
  },
  {
    tag: 'actionButton',
    textLists: ["All-new Action button.", "What will yours do?."],
    videoPath: {
      pc: '/assets/imgs/highlights/highlights-actionButton-large.mp4',
      tb: '/assets/imgs/highlights/highlights-actionButton-medium.mp4',
      mo: '/assets/imgs/highlights/highlights-actionButton-small.mp4',
    },
    imagePath: {
      pc: '/assets/imgs/highlights/highlights_actionButton_endframe_large.jpg',
      tb: '/assets/imgs/highlights/highlights_actionButton_endframe_medium.jpg',
      mo: '/assets/imgs/highlights/highlights_actionButton_endframe_small.jpg',
    },
  },
];

export const actionData = [
  {
    name: "ring_silent", 
    text: "Silent mode",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_ring_silent_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_ring_silent_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_ring_silent_small.jpg',
    },
  },
  {
    name: "focus", 
    text: "Focus",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_focus_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_focus_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_focus_small.jpg',
    },
  },
  {
    name: "camera", 
    text: "Camera",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_camera_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_camera_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_camera_small.jpg',
    },
  },
  {
    name: "flashlight", 
    text: "Flashlight",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_flashlight_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_flashlight_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_flashlight_small.jpg',
    },
  },
  {
    name: "voice_memos", 
    text: "Voice Memo",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_voice_memos_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_voice_memos_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_voice_memos_small.jpg',
    },
  },
  {
    name: "translate", 
    text: "Translate",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_translate_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_translate_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_translate_small.jpg',
    },
  },
  {
    name: "magnifier", 
    text: "Magnifier",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_magnifier_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_magnifier_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_magnifier_small.jpg',
    },
  },
  {
    name: "shortcuts", 
    text: "Shortcut",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_shortcuts_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_shortcuts_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_shortcuts_small.jpg',
    },
  },
  {
    name: "accessibility", 
    text: "Accessibility",
    imagePath: {
      pc: '/assets/imgs/action-button/action_screen_accessibility_large.jpg',
      tb: '/assets/imgs/action-button/action_screen_accessibility_medium.jpg',
      mo: '/assets/imgs/action-button/action_screen_accessibility_small.jpg',
    },
  },
]

export const productData = [
  {
    name: "natural",
    title: "iPhone 15 Pro in Natural Titanium",
    color: "#8F8A81",
    texturePath: '/assets/imgs/viewer/viewer_texture_natural.png',
  },
  {
    name: "blue",
    title: "iPhone 15 Pro in Blue Titanium",
    color: "#414550",
    texturePath: '/assets/imgs/viewer/viewer_texture_blue.png',
  },
  {
    name: "white",
    title: "iPhone 15 Pro in White Titanium",
    color: "#DEDDD7",
    texturePath: '/assets/imgs/viewer/viewer_texture_white.png',
  },
  {
    name: "black",
    title: "iPhone 15 Pro in Black Titanium",
    color: "#424242",
    texturePath: '/assets/imgs/viewer/viewer_texture_black.png',
  },
]