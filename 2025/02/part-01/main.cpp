#include <iostream>
#include <fstream>
#include <string>

std::vector<std::string> parseFile() {
  std::ifstream file("input.txt");
  std::string line;
  std::vector<std::string> id_ranges;

  while (std::getline(file, line, ',')) {
    id_ranges.push_back(line);
  }

  file.close();

  return id_ranges;
}

bool is_invalid_id(long id) {
  std::string str = std::to_string(id);

  if (str.length() % 2 == 0) {
    const size_t mid = str.length() / 2;
    const std::string first_half = str.substr(0, mid);
    const std::string second_half = str.substr(mid);

    if (first_half == second_half) {
      return true;
    }
  }

  return false;
}

std::vector<long> find_invalid_ids(const std::string& id_range) {
  const size_t dash_pos = id_range.find('-');
  const std::string start = id_range.substr(0, dash_pos);
  const std::string end = id_range.substr(dash_pos + 1);
  const long end_id = std::stol(end);
  std::vector<long> invalid_ids;

  for (long current_id = std::stol(start); current_id <= end_id; current_id++) {
    if (is_invalid_id(current_id)) {
      invalid_ids.push_back(current_id);
    }
  }

  return invalid_ids;
}

int main() {
  std::vector<long> invalid_ids;
  long result = 0;

  for (std::vector<std::string> id_ranges = parseFile(); const auto& id_range : id_ranges) {
    std::vector<long> invalid_ids_in_range = find_invalid_ids(id_range);

    invalid_ids.insert(invalid_ids.end(), invalid_ids_in_range.begin(), invalid_ids_in_range.end());
  }

  for (long invalid_id : invalid_ids) {
    result += invalid_id;
  }

  std::cout << result << std::endl;

  return 0;
}
