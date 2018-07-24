import random

# INITIAL VARIABLES
attempts = 12
lenght = 4
options = ["YELLOW", "BLUE", "PURPLE", "RED", "GREEN"]
pattern = [random.choice(options) for _ in range(lenght)]

# DEBUG
# print "Cheat: ", pattern
# print "Attempts remaining: ", attempts

# FUNCTION DECLARATION
def main():
	# main(): It recieves an input, compares it to the pattern to guess and responds with a conclusion.
	guess_1 = raw_input('First guess: ')
	guess_2 = raw_input('Second guess: ')
	guess_3 = raw_input('Third guess: ')
	guess_4 = raw_input('Fourth guess: ')
	guess = [guess_1, guess_2, guess_3, guess_4]

	black=0
	white=0
	for n in range(lenght):
		if guess[n] == pattern[n]:
			black+=1
		else:
			if guess[n] in pattern:
				white+=1

	print "You got ", black, "black pegs"
	print "You got ", white, "white pegs"

	return black == lenght

# MAIN LOOP
for each in range(attempts):
	# For Loop: Runs until the user runs out of attempts or the function returns a True value meaning the user won the game.
	if main():
		print "You guessed it right! You're such a code breaker!"
		break
	else:
		print"Attempts remaining: ", attempts - 1 - each
else:
	print "Game Over. You didn't get the code right, it was as simple as ", pattern