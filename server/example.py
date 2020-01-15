def map():
	a = 1
	return a + 3


def reduce(results):
	total = 0
	for res in results:
		total += int(res)
	return total

