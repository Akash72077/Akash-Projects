import java.util.*;
public class shortestPath {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the path: ");
        String path=sc.next().toUpperCase();
        int x=0,y=0;
        for(int i=0; i<path.length(); i++){
            if(path.charAt(i)=='N')
            x++;
            else if(path.charAt(i)=='S')
            x--;
            else if(path.charAt(i)=='W')
            y--;
            else if(path.charAt(i)=='E')
            y++;
    
        }
            Double shortestPath=Math.sqrt((x*x)+(y*y));
            System.out.printf("The Shortest path is: %.2f\n", shortestPath);

            sc.close();
        }

    }
