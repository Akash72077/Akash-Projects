import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JButton;

public class SimpleGUI1 {

    public static void main(String[] args) {

        JFrame frame = new JFrame("Hello this is our frame!");
        JButton button = new JButton("Click me!");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().add(button);
	frame.setSize(300,300);
	frame.setVisible(true);


        
    }
}