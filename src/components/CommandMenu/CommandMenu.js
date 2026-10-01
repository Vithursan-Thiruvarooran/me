import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, Dialog, InputBase, List, ListItemButton, ListSubheader, Typography, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { scroller } from "react-scroll";

import themeContext from "../../contexts/themeContext";
import { projects, gitHub, linkedIn } from "../../assets/data/data";

export const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
export const shortcutLabel = isMac ? "⌘K" : "Ctrl K";
export const openCommandMenu = () => window.dispatchEvent(new Event("open-command-menu"));

const scrollTo = (id) => scroller.scrollTo(id, { smooth: true, duration: 500, offset: id === "home" ? 0 : -70 });
const openLink = (url) => window.open(url, "_blank", "noopener");

// ⌘K / Ctrl+K palette for jumping to sections, opening projects and links, and switching theme.
const CommandMenu = () => {
  const theme = useTheme();
  const { isDarkMode, setIsDarkMode } = useContext(themeContext);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const listRef = useRef(null);

  const actions = useMemo(() => [
    ...[["Home", "home"], ["About", "about"], ["Experience", "experience"], ["Projects", "projects"], ["Contact", "contact"]]
      .map(([name, id]) => ({ group: "Go to", name, run: () => scrollTo(id) })),
    ...projects.map((p, i) => ({
      group: "Projects", name: p.title,
      run: () => scrollTo(`project-${i}`),
    })),
    { group: "Links", name: "Resume", hint: "↗", run: () => openLink("/resume.pdf") },
    { group: "Links", name: "GitHub", hint: "↗", run: () => openLink(gitHub) },
    { group: "Links", name: "LinkedIn", hint: "↗", run: () => openLink(linkedIn) },
    { group: "Settings", name: `Switch to ${isDarkMode ? "light" : "dark"} theme`, run: () => setIsDarkMode(!isDarkMode) },
  ], [isDarkMode, setIsDarkMode]);

  const q = query.trim().toLowerCase();
  const shown = actions.filter((a) => !q || `${a.name} ${a.group}`.toLowerCase().includes(q));
  const current = Math.min(selected, Math.max(0, shown.length - 1));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) { setQuery(""); setSelected(0); }
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [current, open]);

  const run = (action) => {
    if (!action) return;
    setOpen(false);
    action.run();
  };

  const onInputKey = (e) => {
    if (!shown.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((current + 1) % shown.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((current - 1 + shown.length) % shown.length); }
    else if (e.key === "Enter") { e.preventDefault(); run(shown[current]); }
  };

  let lastGroup = null;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          alignSelf: "flex-start",
          mt: { xs: 2, sm: "12vh" },
          mx: 2,
          width: "calc(100% - 32px)",
          bgcolor: "background.default",
          backgroundImage: "none",
          borderRadius: 3,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, borderBottom: 1, borderColor: "divider" }}>
        <SearchIcon sx={{ color: "text.secondary" }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Search sections, projects, links…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
          onKeyDown={onInputKey}
          inputProps={{
            "aria-label": "Search commands",
            role: "combobox",
            "aria-controls": "command-list",
            "aria-expanded": true,
            "aria-activedescendant": shown.length ? `command-${current}` : undefined,
          }}
          sx={{ py: 1.5, fontSize: 16 }}
        />
      </Box>
      <List id="command-list" role="listbox" ref={listRef} sx={{ maxHeight: 360, overflow: "auto", p: 1 }}>
        {!shown.length && (
          <Typography sx={{ p: 2 }} color="text.secondary">
            Nothing matches "{query}". Try "projects" or "github".
          </Typography>
        )}
        {shown.map((a, i) => {
          const header = a.group !== lastGroup;
          lastGroup = a.group;
          return (
            <React.Fragment key={a.group + a.name}>
              {header && (
                <ListSubheader disableSticky sx={{ bgcolor: "transparent", lineHeight: "32px", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase" }}>
                  {a.group}
                </ListSubheader>
              )}
              <ListItemButton
                id={`command-${i}`}
                role="option"
                aria-selected={i === current}
                selected={i === current}
                onClick={() => run(a)}
                onMouseMove={() => i !== current && setSelected(i)}
                sx={{ borderRadius: 2, justifyContent: "space-between", minHeight: 44 }}
              >
                <Typography component="span">{a.name}</Typography>
                {a.hint && <Typography component="span" variant="caption" sx={{ opacity: 0.7 }}>{a.hint}</Typography>}
              </ListItemButton>
            </React.Fragment>
          );
        })}
      </List>
      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, px: 2, py: 1, borderTop: 1, borderColor: "divider", color: theme.palette.text.secondary }}>
        {["↑↓ move", "↵ open", "esc close"].map((t) => (
          <Typography key={t} variant="caption" sx={{ fontFamily: "ui-monospace, Menlo, Consolas, monospace" }}>{t}</Typography>
        ))}
      </Box>
    </Dialog>
  );
};

export default CommandMenu;
