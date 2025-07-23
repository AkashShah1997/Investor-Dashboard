import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <TextField
      label={placeholder}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      sx={{ mb: 2, maxWidth: 400 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}