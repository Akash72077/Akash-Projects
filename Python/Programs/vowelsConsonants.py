string= input("Enter a String: ")
vowel, consonant=0,0
for ch in string:
    if ch.isalpha():
        if ch.lower() in 'aeiou':
            vowel+=1
        else:
            consonant+=1
print(f"Number of vowels:{vowel}")
print(f"Number of consonants:{consonant}")
