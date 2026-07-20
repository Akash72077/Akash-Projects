import cv2
import imutils
img = cv2.imread("C:/Akash/Python/AI/image.png")

resizedImg=imutils.resize(img, width=200)

cv2.imwrite('resizedImage.png', resizedImg)
cv2.imshow('original.png', img)
cv2.imshow('Resized.png', resizedImg) 

cv2.waitKey(0)
cv2.destroyAllWindows()