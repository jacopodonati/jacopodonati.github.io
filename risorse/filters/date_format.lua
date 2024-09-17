local months = {
  [1] = "gennaio", [2] = "febbraio", [3] = "marzo", [4] = "aprile",
  [5] = "maggio", [6] = "giugno", [7] = "luglio", [8] = "agosto",
  [9] = "settembre", [10] = "ottobre", [11] = "novembre", [12] = "dicembre"
}

function Meta(m)
  m.date = pandoc.MetaInlines(format_date(m.date[1].text))
  return m
end

function format_date(date_string)
  local year, month, day = date_string:match("(%d+)-(%d+)-(%d+)")
  if year and month and day then
      return string.format("%d %s %s", tonumber(day), months[tonumber(month)], year)
  else
      return date_string
  end
end