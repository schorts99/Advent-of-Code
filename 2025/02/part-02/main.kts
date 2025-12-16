#!/usr/bin/env kotlin

import java.io.File

fun parseFile(): List<String> =
  File("input.txt")
    .readText()
    .split(",")

fun isInvalidId(id: Long): Boolean {
  val idString = id.toString()
  val length = idString.length

  for (len in 1..(length / 2)) {
    if (length % len != 0) continue

    val chunk = idString.substring(0, len)
    val repeated = chunk.repeat(length / len)

    if (repeated == idString) return true
  }

  return false
}

fun findInvalidIds(range: String): List<Long> {
  val (startStr, endStr) = range.split("-")
  val start = startStr.toLong()
  val end = endStr.toLong()

  val invalid = mutableListOf<Long>()

  for (id in start..end) {
    if (isInvalidId(id)) invalid.add(id)
  }

  return invalid
}

val invalidIds = mutableListOf<Long>()

for (range in parseFile()) {
  invalidIds += findInvalidIds(range)
}

val result = invalidIds.sum()

println(result)
