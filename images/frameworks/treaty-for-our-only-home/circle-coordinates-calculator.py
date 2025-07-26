import math

def calculate_circle_coordinates():
    """
    Calculate precise coordinates for 7 circles evenly spaced around a center point
    """
    # Parameters
    center_x = 400
    center_y = 400
    center_radius = 80
    principle_radius = 70
    distance_from_center = 225  # Distance from center to principle circles
    
    # Calculate angle between each principle (360/7 degrees)
    angle_increment = 360 / 7  # 51.42857142857143 degrees
    
    # Starting angle (0 degrees = top, negative because SVG y increases downward)
    start_angle = -90  # Start at top (12 o'clock position)
    
    principles = [
        "Subsidiarity & Polycentrism",
        "Democratic Legitimacy & Inclusivity", 
        "Accountability & Rule of Law",
        "Agility & Adaptability",
        "Ecological Integrity & Intergenerational Equity",
        "Ethical & Epistemic Integrity",
        "Minimum Viable Governance"
    ]
    
    print("=== CIRCLE COORDINATES ===")
    print(f"Center circle: cx=\"{center_x}\" cy=\"{center_y}\" r=\"{center_radius}\"")
    print()
    
    coordinates = []
    
    for i, principle in enumerate(principles):
        # Calculate angle in degrees
        angle_degrees = start_angle + (i * angle_increment)
        # Convert to radians
        angle_radians = math.radians(angle_degrees)
        
        # Calculate x, y coordinates
        x = center_x + distance_from_center * math.cos(angle_radians)
        y = center_y + distance_from_center * math.sin(angle_radians)
        
        # Round to nearest integer
        x = round(x)
        y = round(y)
        
        coordinates.append((x, y))
        
        print(f"Principle {i+1}: {principle}")
        print(f"  Angle: {angle_degrees:.2f}° ({angle_radians:.4f} radians)")
        print(f"  Coordinates: cx=\"{x}\" cy=\"{y}\" r=\"{principle_radius}\"")
        print()
    
    return coordinates, center_x, center_y, center_radius

def calculate_connection_lines(coordinates, center_x, center_y, center_radius):
    """
    Calculate connection lines from center to each principle and between adjacent principles
    """
    print("=== CONNECTION LINES ===")
    print("Lines from center to each principle:")
    
    # Lines from center to each principle
    for i, (x, y) in enumerate(coordinates):
        # Calculate the point on the center circle edge closest to the principle
        dx = x - center_x
        dy = y - center_y
        distance = math.sqrt(dx*dx + dy*dy)
        
        # Point on center circle edge
        center_edge_x = center_x + (center_radius * dx / distance)
        center_edge_y = center_y + (center_radius * dy / distance)
        
        # Point on principle circle edge
        principle_edge_x = x - (70 * dx / distance)  # 70 is principle radius
        principle_edge_y = y - (70 * dy / distance)
        
        print(f"  Line {i+1}: x1=\"{round(center_edge_x)}\" y1=\"{round(center_edge_y)}\" x2=\"{round(principle_edge_x)}\" y2=\"{round(principle_edge_y)}\"")
    
    print("\nLines between adjacent principles:")
    
    # Lines between adjacent principles
    for i in range(len(coordinates)):
        current = coordinates[i]
        next_coord = coordinates[(i + 1) % len(coordinates)]  # Wrap around to first
        
        # Calculate edge points for both circles
        dx = next_coord[0] - current[0]
        dy = next_coord[1] - current[1]
        distance = math.sqrt(dx*dx + dy*dy)
        
        # Point on current circle edge toward next circle
        current_edge_x = current[0] + (70 * dx / distance)
        current_edge_y = current[1] + (70 * dy / distance)
        
        # Point on next circle edge toward current circle
        next_edge_x = next_coord[0] - (70 * dx / distance)
        next_edge_y = next_coord[1] - (70 * dy / distance)
        
        print(f"  Adjacent line {i+1}-{(i+1) % len(coordinates) + 1}: x1=\"{round(current_edge_x)}\" y1=\"{round(current_edge_y)}\" x2=\"{round(next_edge_x)}\" y2=\"{round(next_edge_y)}\"")

def generate_svg_code(coordinates):
    """
    Generate the SVG code for the circles
    """
    principles = [
        ("Subsidiarity & Polycentrism", ["Subsidiarity &", "Polycentrism"]),
        ("Democratic Legitimacy & Inclusivity", ["Democratic", "Legitimacy &", "Inclusivity"]), 
        ("Accountability & Rule of Law", ["Accountability &", "Rule of Law"]),
        ("Agility & Adaptability", ["Agility &", "Adaptability"]),
        ("Ecological Integrity & Intergenerational Equity", ["Ecological Integrity", "& Intergenerational", "Equity"]),
        ("Ethical & Epistemic Integrity", ["Ethical &", "Epistemic", "Integrity"]),
        ("Minimum Viable Governance", ["Minimum Viable", "Governance"])
    ]
    
    print("\n=== SVG CODE FOR CIRCLES ===")
    
    for i, ((x, y), (principle_name, text_lines)) in enumerate(zip(coordinates, principles)):
        print(f"  <!-- Principle {i+1}: {principle_name} -->")
        print(f"  <circle cx=\"{x}\" cy=\"{y}\" r=\"70\" class=\"principle-circle\"/>")
        print(f"  <circle cx=\"{x}\" cy=\"{y}\" r=\"3\" class=\"accent-dot\"/>")
        
        # Calculate text positions
        if len(text_lines) == 2:
            y_positions = [y - 10, y + 10]
        elif len(text_lines) == 3:
            y_positions = [y - 15, y, y + 15]
        else:
            y_positions = [y]
        
        for line, y_pos in zip(text_lines, y_positions):
            print(f"  <text x=\"{x}\" y=\"{y_pos}\" class=\"principle-text\">{line}</text>")
        print()

if __name__ == "__main__":
    # Calculate coordinates
    coordinates, center_x, center_y, center_radius = calculate_circle_coordinates()
    
    # Calculate connection lines
    calculate_connection_lines(coordinates, center_x, center_y, center_radius)
    
    # Generate SVG code
    generate_svg_code(coordinates)
    
    print("\n=== VERIFICATION ===")
    print(f"Angle between each principle: {360/7:.6f} degrees")
    print(f"Total principles: {len(coordinates)}")
    print(f"Distance from center: 225 pixels")
    print(f"Principle circle radius: 70 pixels")
    print(f"Center circle radius: {center_radius} pixels")