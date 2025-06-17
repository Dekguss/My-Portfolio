import email
from flask import Flask, render_template, jsonify, request
from flask_mail import Mail, Message
import os
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv('DEL_EMAIL')
app.config['MAIL_PASSWORD'] = os.getenv('PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

# Route untuk halaman utama
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    if request.method == 'POST':
        try:
            name = request.form['name']
            visitor_email = request.form['email']
            subject = request.form['subject']
            message = request.form['message']

            # Email akan dikirim ke email pemilik website
            owner_email = os.getenv('REC_EMAIL')  # Email pemilik website
            
            # Buat pesan email
            msg = Message(
                subject=f"Pesan dari Website: {subject}",
                sender=os.getenv('DEL_EMAIL'),  # Email server
                recipients=[owner_email],  # Dikirim ke pemilik website
                reply_to=visitor_email  # Balasan ke email pengunjung
            )
            
            msg.body = f"""Nama: {name}
Email: {visitor_email}
Subjek: {subject}

Pesan:
{message}"""
            
            mail.send(msg)
            return jsonify({'success': True, 'message': 'Pesan berhasil dikirim!'})
            
        except Exception as e:
            logger.error(f"Error sending email: {str(e)}")
            return jsonify({'success': False, 'message': 'Gagal mengirim pesan. Silakan coba lagi nanti.'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
