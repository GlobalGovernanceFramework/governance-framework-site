import math

def calculate_pentagon_coordinates():
    """
    Calculate precise coordinates for 5 pillars arranged in a pentagon around a center point
    """
    # Parameters
    center_x = 400
    center_y = 400
    center_radius = 100  # Larger center for "Polycrisis Response"
    pillar_width = 120   # Width of pillar rectangles
    pillar_height = 80   # Height of pillar rectangles
    distance_from_center = 240  # Distance from center to pillar centers
    
    # Calculate angle between each pillar (360/5 degrees = 72°)
    angle_increment = 360 / 5  # 72 degrees
    
    # Starting angle (0 degrees = top, negative because SVG y increases downward)
    start_angle = -90  # Start at top (12 o'clock position)
    
    pillars = [
        ("Pillar 1", "Reforming Core Intergovernmental Bodies", "Unlock"),
        ("Pillar 2", "Integrating New Actors & Voices", "Legitimize"),
        ("Pillar 3", "Strengthening Global Law & Enforcement", "Enforce"),
        ("Pillar 4", "Reimagining Funding & Resources", "Fuel"),
        ("Pillar 5", "Building Ethical & Epistemic Infrastructure", "Guide")
    ]
    
    print("=== PENTAGON COORDINATES ===")
    print(f"Center element: cx=\"{center_x}\" cy=\"{center_y}\" r=\"{center_radius}\"")
    print()
    
    coordinates = []
    
    for i, (pillar_num, pillar_name, pillar_function) in enumerate(pillars):
        # Calculate angle in degrees
        angle_degrees = start_angle + (i * angle_increment)
        # Convert to radians
        angle_radians = math.radians(angle_degrees)
        
        # Calculate x, y coordinates for pillar center
        x = center_x + distance_from_center * math.cos(angle_radians)
        y = center_y + distance_from_center * math.sin(angle_radians)
        
        # Round to nearest integer
        x = round(x)
        y = round(y)
        
        # Calculate rectangle bounds (top-left corner for SVG rect element)
        rect_x = x - pillar_width // 2
        rect_y = y - pillar_height // 2
        
        coordinates.append({
            'center': (x, y),
            'rect': (rect_x, rect_y),
            'angle': angle_degrees,
            'pillar': pillar_num,
            'name': pillar_name,
            'function': pillar_function
        })
        
        print(f"{pillar_num}: {pillar_name}")
        print(f"  Function: {pillar_function}")
        print(f"  Angle: {angle_degrees:.1f}° ({angle_radians:.4f} radians)")
        print(f"  Center: ({x}, {y})")
        print(f"  Rectangle: x=\"{rect_x}\" y=\"{rect_y}\" width=\"{pillar_width}\" height=\"{pillar_height}\"")
        print()
    
    return coordinates, center_x, center_y, center_radius

def calculate_connection_lines(coordinates, center_x, center_y, center_radius):
    """
    Calculate connection lines from center to each pillar and synergy arrows between pillars
    """
    print("=== CONNECTION LINES ===")
    print("Lines from center to each pillar:")
    
    # Lines from center to each pillar
    for i, coord in enumerate(coordinates):
        x, y = coord['center']
        pillar_width = 120
        pillar_height = 80
        
        # Calculate the point on the center circle edge closest to the pillar
        dx = x - center_x
        dy = y - center_y
        distance = math.sqrt(dx*dx + dy*dy)
        
        # Point on center circle edge
        center_edge_x = center_x + (center_radius * dx / distance)
        center_edge_y = center_y + (center_radius * dy / distance)
        
        # Point on pillar rectangle edge (closest side)
        if abs(dx) > abs(dy):  # Horizontal approach
            pillar_edge_x = x - (pillar_width/2 * (1 if dx > 0 else -1))
            pillar_edge_y = y
        else:  # Vertical approach
            pillar_edge_x = x
            pillar_edge_y = y - (pillar_height/2 * (1 if dy > 0 else -1))
        
        print(f"  Line {i+1}: x1=\"{round(center_edge_x)}\" y1=\"{round(center_edge_y)}\" x2=\"{round(pillar_edge_x)}\" y2=\"{round(pillar_edge_y)}\"")
    
    print("\nSynergy arrows between adjacent pillars (circular flow):")
    
    # Arrows between adjacent pillars (creating circular flow)
    for i in range(len(coordinates)):
        current = coordinates[i]['center']
        next_coord = coordinates[(i + 1) % len(coordinates)]['center']  # Wrap around to first
        
        # Calculate midpoint for curved arrow
        mid_x = (current[0] + next_coord[0]) / 2
        mid_y = (current[1] + next_coord[1]) / 2
        
        # Move midpoint slightly inward toward center for curve effect
        center_dx = center_x - mid_x
        center_dy = center_y - mid_y
        center_distance = math.sqrt(center_dx*center_dx + center_dy*center_dy)
        
        # Move midpoint 20% closer to center
        curve_factor = 0.8
        curved_mid_x = mid_x + (center_dx * (1 - curve_factor))
        curved_mid_y = mid_y + (center_dy * (1 - curve_factor))
        
        print(f"  Synergy arrow {i+1}-{(i+1) % len(coordinates) + 1}:")
        print(f"    Start: ({current[0]}, {current[1]})")
        print(f"    Curve point: ({round(curved_mid_x)}, {round(curved_mid_y)})")
        print(f"    End: ({next_coord[0]}, {next_coord[1]})")

def generate_svg_elements(coordinates, center_x, center_y, center_radius):
    """
    Generate the SVG code for the pillars and center
    """
    print("\n=== SVG CODE FOR ELEMENTS ===")
    
    # Center element
    print("<!-- Center Element -->")
    print(f"<circle cx=\"{center_x}\" cy=\"{center_y}\" r=\"{center_radius}\" class=\"center-circle\"/>")
    print(f"<text x=\"{center_x}\" y=\"{center_y - 10}\" class=\"center-title\">Polycrisis</text>")
    print(f"<text x=\"{center_x}\" y=\"{center_y + 10}\" class=\"center-title\">Response</text>")
    print()
    
    # Pillar elements
    for i, coord in enumerate(coordinates):
        rect_x, rect_y = coord['rect']
        center_x_pillar, center_y_pillar = coord['center']
        pillar_num = coord['pillar']
        pillar_name = coord['name']
        pillar_function = coord['function']
        
        print(f"<!-- {pillar_num}: {pillar_name} -->")
        print(f"<rect x=\"{rect_x}\" y=\"{rect_y}\" width=\"120\" height=\"80\" class=\"pillar-rect\"/>")
        print(f"<text x=\"{center_x_pillar}\" y=\"{center_y_pillar - 25}\" class=\"pillar-number\">{pillar_num}</text>")
        
        # Split long pillar names into multiple lines
        name_words = pillar_name.split()
        if len(name_words) > 4:
            # Split into 2 lines
            mid_point = len(name_words) // 2
            line1 = " ".join(name_words[:mid_point])
            line2 = " ".join(name_words[mid_point:])
            print(f"<text x=\"{center_x_pillar}\" y=\"{center_y_pillar - 8}\" class=\"pillar-name\">{line1}</text>")
            print(f"<text x=\"{center_x_pillar}\" y=\"{center_y_pillar + 8}\" class=\"pillar-name\">{line2}</text>")
        else:
            # Single line or simple split
            if len(pillar_name) > 25:
                # Find good break point
                words = pillar_name.split()
                mid = len(words) // 2
                line1 = " ".join(words[:mid])
                line2 = " ".join(words[mid:])
                print(f"<text x=\"{center_x_pillar}\" y=\"{center_y_pillar - 8}\" class=\"pillar-name\">{line1}</text>")
                print(f"<text x=\"{center_x_pillar}\" y=\"{center_y_pillar + 8}\" class=\"pillar-name\">{line2}</text>")
            else:
                print(f"<text x=\"{center_x_pillar}\" y=\"{center_y_pillar}\" class=\"pillar-name\">{pillar_name}</text>")
        
        print(f"<text x=\"{center_x_pillar}\" y=\"{center_y_pillar + 25}\" class=\"pillar-function\">({pillar_function})</text>")
        print()

def calculate_synergy_arrows(coordinates, center_x, center_y):
    """
    Calculate curved arrow paths for synergy flows
    """
    print("=== SYNERGY ARROW PATHS ===")
    
    for i in range(len(coordinates)):
        current = coordinates[i]['center']
        next_coord = coordinates[(i + 1) % len(coordinates)]['center']
        
        # Calculate control point for quadratic curve
        mid_x = (current[0] + next_coord[0]) / 2
        mid_y = (current[1] + next_coord[1]) / 2
        
        # Move control point toward center for inward curve
        center_dx = center_x - mid_x
        center_dy = center_y - mid_y
        
        # Control point 30% closer to center
        control_x = mid_x + center_dx * 0.3
        control_y = mid_y + center_dy * 0.3
        
        print(f"<!-- Synergy Arrow {i+1} to {(i+1) % len(coordinates) + 1} -->")
        print(f"<path d=\"M {current[0]} {current[1]} Q {round(control_x)} {round(control_y)} {next_coord[0]} {next_coord[1]}\" class=\"synergy-arrow\" marker-end=\"url(#arrowhead)\"/>")

if __name__ == "__main__":
    # Calculate coordinates
    coordinates, center_x, center_y, center_radius = calculate_pentagon_coordinates()
    
    # Calculate connection lines
    calculate_connection_lines(coordinates, center_x, center_y, center_radius)
    
    # Generate SVG elements
    generate_svg_elements(coordinates, center_x, center_y, center_radius)
    
    # Calculate synergy arrows
    calculate_synergy_arrows(coordinates, center_x, center_y)
    
    print("\n=== VERIFICATION ===")
    print(f"Angle between each pillar: {360/5:.1f} degrees")
    print(f"Total pillars: {len(coordinates)}")
    print(f"Distance from center: 240 pixels")
    print(f"Pillar rectangle size: 120x80 pixels")
    print(f"Center circle radius: {center_radius} pixels")