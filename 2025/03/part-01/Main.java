import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Main {
  public static void main(String[] args) throws Exception {
    try (var lines = Files.lines(Path.of("./input.txt"))) {
      int sum = lines.mapToInt(Main::processBatteriesBank).sum();

      System.out.println(sum);
    }
  }

  static int processBatteriesBank(String bank) {
    List<Integer> batteries = bank.chars()
      .map(Character::getNumericValue)
      .boxed()
      .toList();

    int firstMax = -1;
    int secondMax = -1;
    int firstIndex = -1;

    for (int index = 0; index < batteries.size(); index++) {
      int val = batteries.get(index);

      if (val > firstMax) {
        firstMax = val;
        firstIndex = index;
      }
    }

    for (int index = firstIndex + 1; index < batteries.size(); index++) {
      int val = batteries.get(index);
      if (val > secondMax) {
        secondMax = val;
      }
    }

    return firstMax * 10 + secondMax;
  }
}
