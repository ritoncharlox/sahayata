"use client"
import React, { useState, useEffect } from 'react'
import "./JoinUs.css";

import { handleAddService } from '@/actions/handleAddService';

const page = () => {

  const handleBtnClick = async() => {

    const details = [
      {
        "title": "Electrician",
        "description": "Professional electricians provide a wide range of electrical services, from installing and repairing lighting fixtures, power sockets, and switch boards, to setting up telephone and networking sockets. They ensure the safe and efficient operation of electrical systems by maintaining and installing MCBs, MCCBs, and sub meters. Electricians also handle fan installations, inverter maintenance, general wiring tasks, whole house wiring, and solar power system services. They are equipped to diagnose and fix unknown electrical issues and offer custom services for specific electrical needs.",
        "subcategories": {
          create: [
            {
              "title": "Light",
              "description": "Installation and repair of lighting fixtures.",
              "imageAddress": "https://images.unsplash.com/photo-1521288936840-032bc23139ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGVsZWN0cmljJTIwbGlnaHR8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Power Sockets and Switch Boards",
              "description": "Installation and maintenance of sockets and switch boards.",
              "imageAddress": "https://images.unsplash.com/photo-1587534012737-1fd8a84b519e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG93ZXIlMjBzb2NrZXR8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Telephone And Networking Sockets",
              "description": "Setup and repair of telephone and networking sockets.",
              "imageAddress": "https://images.unsplash.com/photo-1565277441243-2be39689f95b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVsZXBob25lfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "MCB & MCCBs",
              "description": "Maintenance and installation of MCB and MCCBs.",
              "imageAddress": "https://media.istockphoto.com/id/1492493901/photo/mcb-or-circuit-breaker-was-installed-on-the-wall.jpg?s=612x612&w=0&k=20&c=jjSmqviSqrDXvEz3-8gZQu2Vtb95etcFZ7U1Kt7HV6E="
            },
            {
              "title": "Sub Meter",
              "description": "Installation and repair of sub meters for electricity.",
              "imageAddress": "https://images.unsplash.com/photo-1527332756452-1ebef4a55fb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWxlY3RyaWMlMjBzdWIlMjBtZXRlcnxlbnwwfDF8MHx8fDI%3D"
            },
            {
              "title": "Fan",
              "description": "Installation and repair of ceiling and wall fans.",
              "imageAddress": "https://images.unsplash.com/photo-1598492665673-f853ef03add4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWMlMjBmYW58ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Inverter",
              "description": "Installation and maintenance of power inverters.",
              "imageAddress": "https://media.istockphoto.com/id/1405056288/photo/power-adapter-isolated-above-white-background-220v-to-12v.jpg?s=612x612&w=0&k=20&c=MEZgAiD60v4kteUUeiZnBUt-wuiFdOBjpFXTMWq6o3A="
            },
            {
              "title": "Wiring",
              "description": "General electrical wiring services.",
              "imageAddress": "https://images.unsplash.com/photo-1557516300-46e218a6961f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lyaW5nfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Whole House Wiring",
              "description": "Complete wiring solutions for entire houses.",
              "imageAddress": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2UlMjB3aXJpbmd8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Solar Repair And Installation",
              "description": "Repair and installation of solar power systems.",
              "imageAddress": "https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29sYXIlMjBwYW5lbHN8ZW58MHwxfDB8fHwy"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/3707/3707167.png",
        "imageAddress": "https://wallpapers.com/images/hd/electrician-switch-installation-srv8dn3qbathdjre.jpg"
      },
      {
        "title": "Plumbing Service",
        "description": "Our professional plumbing service offers comprehensive solutions for all your plumbing needs. From installing and repairing wash basins, taps, and faucets, to fixing and maintaining toilets and water tanks, our skilled plumbers ensure your plumbing systems function smoothly. We specialize in clearing blockages and providing complete plumbing solutions for entire houses. Whether it's a known issue or an unidentified problem, our team is equipped to diagnose and resolve it efficiently. Trust us to keep your plumbing in top condition with reliable and prompt service.",
        "subcategories": {
          create: [
            {
              "title": "Wash Basin",
              "description": "Installation and repair of wash basins.",
              "imageAddress": "https://images.unsplash.com/photo-1556228578-1f08a75ac92d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FzaCUyMGJhc2lufGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Tap And Faucets",
              "description": "Installation and maintenance of taps and faucets.",
              "imageAddress": "https://images.unsplash.com/photo-1602761004880-0cbb1ba589d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFRhcCUyMEFuZCUyMEZhdWNldHN8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Toilet",
              "description": "Repair and maintenance of toilet systems.",
              "imageAddress": "https://images.unsplash.com/photo-1563204719-44395a035bb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9pbGV0fGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Water Tank",
              "description": "Installation and repair of water tanks.",
              "imageAddress": "https://media.istockphoto.com/id/182150089/photo/a-water-tank-surrounded-by-a-floral-vine.jpg?s=612x612&w=0&k=20&c=4bdGFU6K3Q0RrOBDryh4uqIqD1z1J4ydYrg4983b3b4="
            },
            {
              "title": "Blockages",
              "description": "Clearing blockages in plumbing systems.",
              "imageAddress": "https://media.istockphoto.com/id/1045602268/vector/paper-in-toilet-consequences-litter-in-water-pipe-old-pipes-water-leak-sewerage-is-broken.jpg?s=612x612&w=0&k=20&c=joZvnSMwYeEbfBqOBYjPpLas_TYa5ZJMUMa5HjEhW_o="
            },
            {
              "title": "Whole House Plumbing",
              "description": "Complete plumbing solutions for entire houses.",
              "imageAddress": "https://images.unsplash.com/photo-1551837818-f52fc6991b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGx1bWJpbmd8ZW58MHwxfDB8fHwy"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/312/312971.png",
        "imageAddress": "https://static.vecteezy.com/system/resources/previews/005/006/735/non_2x/plumbing-service-with-plumber-workers-repair-maintenance-fix-home-and-cleaning-bathroom-equipment-in-flat-background-illustration-vector.jpg"
      },
      {
        "title": "Home Painting Service",
        "description": "Transform your home with our professional painting services. Whether you need interior or exterior painting, our skilled painters deliver high-quality results with meticulous attention to detail. From choosing the perfect color to ensuring a flawless finish, we make your home look fresh, vibrant, and inviting. Enhance the beauty and value of your property with our reliable and efficient painting services.",
        "imageAddress": "https://media.istockphoto.com/id/519251233/photo/3d-interor-of-orange-white-bedroom.jpg?s=612x612&w=0&k=20&c=rD0VlSzhEilfLVPk0v94FxhjSATvaKaKuWexXYW5hTc=",
        "subcategories": {
          create: [
            {
              "title": "Interior Painting",
              "description": "Professional house inner wall painting for fresh, vibrant interiors.",
              "imageAddress": "https://images.unsplash.com/photo-1516962080544-eac695c93791?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMHBhaW50aW5nfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Exterior Painting",
              "description": "Expert house outer wall painting for durable, attractive exteriors.",
              "imageAddress": "https://images.unsplash.com/photo-1687069241293-152f51173d04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGhvdXNlJTIwcGFpbnRpbmd8ZW58MHwxfDB8fHwy"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/1815/1815785.png"
      },
      {
        "title": "Computer And Networking",
        "description": "Our computer and networking service offers expert solutions for all your technology needs. We specialize in repairing and servicing computers and laptops, ensuring they operate at peak performance. Our services include fixing and maintaining printers and photocopy machines, providing skilled IT technicians for technical support, and setting up gaming systems for an enhanced experience. Whether you need regular servicing or have specific technical issues, our experienced team is ready to assist you with reliable and efficient service.",
        "subcategories": {
          create: [
            {
              "title": "Computer And Laptop Repairing",
              "description": "Repair services for computers and laptops.",
              "imageAddress": "https://images.unsplash.com/photo-1709102884400-b50ca1a12bc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q29tcHV0ZXIlMjBBbmQlMjBMYXB0b3AlMjBSZXBhaXJpbmd8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Printers And Photocopy Machine",
              "description": "Maintenance and repair of printers and photocopy machines.",
              "imageAddress": "https://media.istockphoto.com/id/187656221/photo/copier-in-an-office-floor.jpg?s=612x612&w=0&k=20&c=duV2ccmtnHbtbjGPzQaSisS-nvwpea0nEbS__y0E6XU="
            },
            {
              "title": "IT Technician",
              "description": "Professional IT technician support.",
              "imageAddress": "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaG5pY2lhbnxlbnwwfDF8MHx8fDI%3D"
            },
            {
              "title": "Computer And Laptop Servicing",
              "description": "Regular servicing for computers and laptops.",
              "imageAddress": "https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fENvbXB1dGVyJTIwQW5kJTIwTGFwdG9wJTIwc2VydmljaW5nfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Gaming Setup",
              "description": "Setup and optimization of gaming systems.",
              "imageAddress": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGdhbWluZyUyMHNldHVwfGVufDB8MXwwfHx8Mg%3D%3D"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/3067/3067451.png",
        "imageAddress": "https://acom.pk/cdn/shop/articles/generation_of_laptop_1200x.jpg?v=1678446433"
      },
      {
        "title": "Electronic Devices",
        "description": "Our electronic devices service offers comprehensive solutions for all your electronic appliances. We specialize in repairing and servicing a wide range of devices including televisions, air conditioners (AC), refrigerators, washing machines, geysers, ovens, irons, and vacuum cleaners. Our skilled technicians are trained to diagnose and fix issues efficiently, ensuring your devices operate smoothly. Whether it's a malfunctioning appliance or regular maintenance, you can rely on us for prompt and reliable service to keep your electronic devices in top condition.",
        "subcategories": {
          create: [
            {
              "title": "Television",
              "description": "Expert repair and servicing of televisions.",
              "imageAddress": "https://images.unsplash.com/photo-1548780364-65517933892b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRlbGV2aXNpb258ZW58MHwxfDB8fHwy"
            },
            {
              "title": "AC",
              "description": "Proficient maintenance and repair of air conditioners.",
              "imageAddress": "https://images.unsplash.com/photo-1568634699096-82c9765548a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpciUyMGNvbmRpdGlvbmVyfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Refrigerator",
              "description": "Thorough repair and servicing of refrigerators.",
              "imageAddress": "https://images.unsplash.com/photo-1699044782986-f9c1a24c5601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxSZWZyaWdlcmF0b3J8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Washing Machine",
              "description": "Complete maintenance and repair of washing machines.",
              "imageAddress": "https://images.unsplash.com/photo-1624372635277-283042097f31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHdhc2hpbmclMjBtYWNoaW5lfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Geyser",
              "description": "Efficient repair and servicing of geysers for hot water needs.",
              "imageAddress": "https://media.istockphoto.com/id/1464422857/photo/vertical-shot-of-a-metal-geyser-coffee-maker-on-an-electric-stove.jpg?s=612x612&w=0&k=20&c=2FJRfzCym61RoD0leFie4ceD5qBDZEP1JODUESEceQg="
            },
            {
              "title": "Oven",
              "description": "Specialized maintenance and repair of ovens for cooking perfection.",
              "imageAddress": "https://images.unsplash.com/photo-1628797292362-1f382b2f4b5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b3ZlbnxlbnwwfDF8MHx8fDI%3D"
            },
            {
              "title": "Iron",
              "description": "Skilled repair and servicing of irons for crisp results.",
              "imageAddress": "https://images.unsplash.com/photo-1540544093-b0880061e1a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXJvbnxlbnwwfDF8MHx8fDI%3D"
            },
            {
              "title": "Vacuum Cleaner",
              "description": "Thorough maintenance and repair of vacuum cleaners for cleaning.",
              "imageAddress": "https://media.istockphoto.com/id/2155124440/photo/woman-cleaning-apartment-with-vacuum-cleaner.jpg?s=612x612&w=0&k=20&c=iNKl2dYk2yC0eKIj0NXCm8zRFs58SlZXPAqzElsdlPk="
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/2777/2777142.png",
        "imageAddress": "https://media.istockphoto.com/id/1270089975/vector/set-line-computer-monitor-screen-gamepad-graphic-tablet-and-photo-camera-glowing-neon-icon.jpg?s=612x612&w=0&k=20&c=amH0ZplbgyC9WfiTHQcNuquDhRKbhUN3zMiPDlnlRu8="
      },
      {
        "title": "Cleaning Service",
        "description": "Our cleaning service provides comprehensive solutions for maintaining cleanliness in your surroundings. We specialize in tank cleaning, ensuring your water storage units are free from contaminants and safe for use. Our house cleaning service offers thorough cleaning of all areas, leaving your home spotless and sanitized. Additionally, we manage waste efficiently, ensuring proper disposal and contributing to a clean environment. Trust us to handle all your cleaning needs with professionalism and attention to detail.",
        "subcategories": {
          create: [
            {
              "title": "Tank Cleaning",
              "description": "Expert cleaning and disinfection of water storage tanks.",
              "imageAddress": "https://media.istockphoto.com/id/149260485/photo/fully-protected-specialist-with-hose-in-at-industrial-tank.jpg?s=612x612&w=0&k=20&c=GzdHRcD36jFVockgRC-55UndVQ6PZRiguGnTlSS6m2k="
            },
            {
              "title": "House Cleaning",
              "description": "Thorough cleaning and sanitization of residential spaces.",
              "imageAddress": "https://media.istockphoto.com/id/1080174994/photo/cleaning-tools-on-the-floor-indoors.jpg?s=612x612&w=0&k=20&c=LwSZh59i6ukkrSlUwlSxvIHkVjkpqsWqub7MBo5wT9g="
            },
            {
              "title": "Waste Management",
              "description": "Efficient handling and disposal of waste materials.",
              "imageAddress": "https://images.unsplash.com/photo-1545303234-a34381f8b5cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2FzdGUlMjBtYW5hZ2VtZW50fGVufDB8MXwwfHx8Mg%3D%3D"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/2946/2946701.png",
        "imageAddress": "https://media.istockphoto.com/id/1429977547/photo/person-using-vacuum-cleaner-for-cleaning-carpet.jpg?s=612x612&w=0&k=20&c=0aMmZp6ZxrwkWNHOyUOFYgDe2H5Ml1SmjFF4-DZm5Do="
      },
      {
        "title": "Beautician",
        "description": "Our beautician service offers a range of specialized treatments to enhance your beauty and confidence. Indulge in our bridal packages, carefully curated to make your special day even more memorable. Our makeup artists skillfully create stunning looks for any occasion, accentuating your natural beauty. Add a touch of tradition with intricate Mehendi designs expertly applied by our talented artists. Rejuvenate your skin with our facial treatments, tailored to your skin type for a radiant glow. Transform your hair with our professional hairstyling services, from cuts and colors to styling for any event. Experience smooth and silky skin with our waxing services, leaving you feeling refreshed and confident. Trust us to pamper you and bring out your inner beauty.",
        "subcategories": {
          create: [
            {
              "title": "Bridal Packages",
              "description": "Tailored packages for brides-to-be.",
              "imageAddress": "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwYnJpZGV8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Makeup",
              "description": "Expert makeup application for any occasion.",
              "imageAddress": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFrZXVwfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Mehendi",
              "description": "Intricate designs for traditional adornment.",
              "imageAddress": "https://media.istockphoto.com/id/1456000308/photo/mehndi-henna-tattoo-design-tattoos-stencils-prints-on-a-girl-female-hands-wedding-and-eid.jpg?s=612x612&w=0&k=20&c=AxNWOAgMLPLc-puffRNRe2j0lsoZL9B71QDym0rXjUA="
            },
            {
              "title": "Facial",
              "description": "Rejuvenating treatments for your skin.",
              "imageAddress": "https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Hair",
              "description": "Professional styling for your hair.",
              "imageAddress": "https://images.unsplash.com/photo-1575287537815-ef82dd922198?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGhhaXJ8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Waxing",
              "description": "Efficient services for smooth skin.",
              "imageAddress": "https://media.istockphoto.com/id/1292351480/photo/banner-for-hair-removal-at-spa-studio-woman-hand-with-shugaring-wax-and-cosmetologist-hand.jpg?s=612x612&w=0&k=20&c=NRDxH0XYBPlW4xIhR2-8E_4GFhqYOW1x5qKygwDrYso="
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/15898/15898074.png",
        "imageAddress": "https://media.istockphoto.com/id/1130309620/photo/woman-getting-beauty-treatment-in-beauty-spa.jpg?s=612x612&w=0&k=20&c=1t4M6H35GAyXlWCdb-JX0o2oyqJd71Nt0r4ORJZ37qY="
      },
      {
        "title": "Laundry Service",
        "description": "Our laundry service provides meticulous care for your garments, ensuring they're impeccably clean and fresh. From everyday attire to special occasion outfits, we handle each item with the utmost attention to detail. Whether it's your cherished party wear or your casual wardrobe staples, our dedicated team uses advanced cleaning techniques and premium products to deliver exceptional results. Simply entrust us with your laundry needs, choose between our services for normal clothes or party wear, and experience the convenience of having perfectly laundered garments, ready to wear.",
        "subcategories": {
          create: [
            {
              "title": "Normal Clothes",
              "description": "Cleaning service for everyday wear.",
              "imageAddress": "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5vcm1hbCUyMGNsb3RoZXN8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Party Wear",
              "description": "Specialized cleaning for party and formal attire.",
              "imageAddress": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8MXwwfHx8Mg%3D%3D"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/3322/3322854.png",
        "imageAddress": "https://media.istockphoto.com/id/1350984961/photo/man-doing-launder-holding-basket-with-dirty-laundry-of-the-washing-machine-in-the-public.jpg?s=612x612&w=0&k=20&c=QINd-dDC2mMfMKeSF2HTEg8SpFRmlK-zdIbhH5Z7jvk="
      },
      {
        "title": "Home Construction",
        "description": "Our home construction service is your one-stop solution for realizing your dream home. With expert engineer consultation, we guide you through every step of the construction process, ensuring your vision is brought to life. Our home design team collaborates closely with you to create personalized plans that reflect your lifestyle and preferences. From concept to completion, our whole home construction service delivers quality craftsmanship and attention to detail. Whether you're building from scratch or renovating, trust us to turn your aspirations into a beautifully constructed reality.",
        "subcategories": {
          create: [
            {
              "title": "Engineer Consultation",
              "description": "Expert guidance and advice from experienced engineers.",
              "imageAddress": "https://images.unsplash.com/photo-1581091212911-f4efc3f71c48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW5naW5lZXJzfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Home Design",
              "description": "Collaborative creation of personalized home plans.",
              "imageAddress": "https://media.istockphoto.com/id/1790381625/photo/architects-hands-drawing-of-modern-house-with-material-sample-on-creative-desk-architect.jpg?s=612x612&w=0&k=20&c=ECqq3PZA2J3v4TDdK_O20au0TXgjQzZj4QGZ5iu9Gzs="
            },
            {
              "title": "Whole Home Construction",
              "description": "Construction services from start to finish.",
              "imageAddress": "https://images.unsplash.com/photo-1557813282-bcd50093e38f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvbWUlMjBjb25zdHJ1Y3Rpb258ZW58MHwxfDB8fHwy"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/15952/15952638.png",
        "imageAddress": "https://media.istockphoto.com/id/1304037325/photo/new-luxury-residential-towers-construction-on-the-waterfront-of-east-river-in-greenpoint.jpg?s=612x612&w=0&k=20&c=RLaspPpuxYokcRsh5up-YE8IK8V0XkBXigZckY9uDWs="
      },
      {
        "title": "Home Renovation",
        "description": "Our home renovation service transforms your living spaces into beautiful, functional areas that reflect your style and preferences. From bathroom and kitchen renovations to upgrading your home's exterior with aluminum, UPVC, and railing installations, we offer comprehensive solutions to enhance every aspect of your home. Our expertise extends to door and window replacements, ensuring energy efficiency and security. Additionally, our custom furniture solutions add the perfect finishing touch to your newly renovated spaces. Trust us to breathe new life into your home, creating a haven that you'll love coming back to.",
        "subcategories": {
          create: [
            {
              "title": "Bathroom Renovation",
              "description": "Luxurious updates for your bathroom.",
              "imageAddress": "https://images.unsplash.com/photo-1517414628894-83d47b22f233?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0aHJvb20lMjByZW5vdmF0aW9ufGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Kitchen Renovation",
              "description": "Functional and stylish kitchen updates.",
              "imageAddress": "https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGtpdGNoZW4lMjByZW5vdmF0aW9ufGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Aluminum",
              "description": "Modern installations for durable exteriors.",
              "imageAddress": "https://media.istockphoto.com/id/1603912161/photo/chrome-colored-surface-background.jpg?s=612x612&w=0&k=20&c=tVZZzsxsQ2iMZkBxGfl8SB4VOY21qWIPiV7-8R1TyMI="
            },
            {
              "title": "UPVC",
              "description": "Energy-efficient installations for windows and doors.",
              "imageAddress": "https://media.istockphoto.com/id/904683302/photo/repair-of-plastic-windows.jpg?s=612x612&w=0&k=20&c=OIUHbY0N-rQAXMmGSaFxrmYuo5lpJxWs0mSrVRcJtq0="
            },
            {
              "title": "Railings",
              "description": "Stylish railing solutions for safety.",
              "imageAddress": "https://images.unsplash.com/photo-1591291454780-d223f266efb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbGluZ3N8ZW58MHwxfDB8fHwy"
            },
            {
              "title": "Door And Windows",
              "description": "Replacement for improved functionality and security.",
              "imageAddress": "https://images.unsplash.com/photo-1494475673543-6a6a27143fc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9vcnMlMjBhbmQlMjB3aW5kb3dzfGVufDB8MXwwfHx8Mg%3D%3D"
            },
            {
              "title": "Furnitures",
              "description": "Custom designs to complement your spaces.",
              "imageAddress": "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVybml0dXJlfGVufDB8MXwwfHx8Mg%3D%3D"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/5687/5687442.png",
        "imageAddress": "https://media.istockphoto.com/id/1693429373/photo/small-wooden-house-with-text-home-improvement-on-a-workbench.jpg?s=612x612&w=0&k=20&c=mMKJLb9IsF9ZKvUPEInJ7IL4jN4XqIAJRxbKZNVy54w="
      },
      {
        "title": "Catering Services",
        "description": "Our catering services offer a diverse array of delicious options tailored for various events and occasions. From intimate gatherings to grand celebrations, we specialize in crafting exceptional culinary experiences that leave a lasting impression. Whether you're hosting a casual bartabanda or a lavish wedding feast, our dedicated team works closely with you to curate menus that suit your tastes and preferences. With meticulous attention to detail and a commitment to excellence, we strive to ensure that every aspect of your event is flawlessly executed, leaving you and your guests delighted and satisfied.",
        "subcategories": {
          create: [
            {
              "title": "Marriage",
              "description": "Exquisite menus for memorable weddings.",
              "imageAddress": "https://images.unsplash.com/photo-1620735692151-26a7e0748429?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHdlZGRpbmclMjBjYXRlcmluZ3xlbnwwfDF8MHx8fDI%3D"
            },
            {
              "title": "Bartabanda",
              "description": "Traditional delicacies for milestone celebrations.",
              "imageAddress": "https://images.unsplash.com/photo-1712249238072-ff8b07698065?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwdHJhZGl0aW9uYWwlMjBmb29kc3xlbnwwfDF8MHx8fDI%3D"
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/13910/13910909.png",
        "imageAddress": "https://media.istockphoto.com/id/1220799656/photo/buffet-reception-finger-food-appetizers.jpg?s=612x612&w=0&k=20&c=LCHg6b7ohX_aGHJHoX86XDZuhX-MX67_dOY8z-TQllI="
      },
      {
        "title": "Shifting Service",
        "description": "Relocating can be a daunting task, but with our comprehensive shifting service, you can breathe easy knowing that your home, room, or office move is in capable hands. Our experienced team understands complexities involved in relocation and is dedicated to providing you with a seamless and stress-free experience. From meticulously packing your belongings to safely transporting them to your new destination, we handle every aspect of the move with precision and care. Whether you're moving across town or to a new city, our tailored solutions ensure that your transition is smooth and hassle-free. With our commitment to excellence and attention to detail, you can trust us to make your relocation journey a memorable one.",
        "subcategories": {
          create: [
            {
              "title": "House",
              "description": "Relocation assistance for your entire home.",
              "imageAddress": "https://media.istockphoto.com/id/2115097019/photo/3d-rendering-of-small-16-storeyed-block-of-flats-on-blue-hand-truck.jpg?s=612x612&w=0&k=20&c=6WeN3RNYzQFSR6hAxJqmUJQepW_9hQ2Yvfhu6qFzxrA="
            },
            {
              "title": "Room",
              "description": "Efficient moving services for individual rooms.",
              "imageAddress": "https://media.istockphoto.com/id/1845515230/photo/new-beginnings-unboxed.jpg?s=612x612&w=0&k=20&c=Qj9xoaD4AnwfdqpWMahfFWRklhYoy0UWRD4Q4TOVC-4="
            },
            {
              "title": "Office",
              "description": "Seamless relocation solutions for your office space.",
              "imageAddress": "https://media.istockphoto.com/id/2155529192/photo/in-the-office-shot-captures-the-supervisor-signing-the-resignation-mail-careful-and-calm-as.jpg?s=612x612&w=0&k=20&c=vWBoIamyQ1meQE42sucKKigNWB6qNP-r5V8w1OhULwU="
            }
          ]
        },
        "icon": "https://cdn-icons-png.flaticon.com/128/10235/10235832.png",
        "imageAddress": "https://media.istockphoto.com/id/1890089174/photo/empty-trucking-van-in-living-room-relocation-and-cardboard-boxes.jpg?s=612x612&w=0&k=20&c=TX31OgKAKfWfTLUZJo81gjQqZt3bdlbPZmpU54RX8Y8="
      }
    ]

    // const addedService = await handleAddService(details);
    // if (addedService.success) {
    //   console.log("done");
    //   console.log(addedService.data);
    // }

    console.log("hello");

  };

  return (
    <main className="joinus-container">
      <button className='addservice-btn' onClick={async(e) => { await handleBtnClick(); }}>Add Service</button>
    </main>
  )
}

export default page
