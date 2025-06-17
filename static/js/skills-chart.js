/**
 * Inisialisasi dan konfigurasi chart untuk soft skills
 */
function initializeSoftSkillsChart() {
    const chartElement = document.getElementById('softSkillsChart');
    if (!chartElement) return;

    const chart = echarts.init(chartElement);
    
    const option = {
        animation: false,
        radar: {
            indicator: [
                { name: 'Communication', max: 100 },
                { name: 'Teamwork', max: 100 },
                { name: 'Problem Solving', max: 100 },
                { name: 'Creativity', max: 100 },
                { name: 'Leadership', max: 100 },
                { name: 'Time Management', max: 100 }
            ],
            radius: '65%',
            splitNumber: 4,
            axisName: {
                color: '#1f2937',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(211, 211, 211, 0.8)'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
                }
            }
        },
        series: [{
            name: 'Soft Skills',
            type: 'radar',
            data: [{
                value: [90, 85, 95, 80, 75, 85],
                name: 'Skills Level',
                areaStyle: {
                    color: 'rgba(87, 181, 231, 0.1)'
                },
                lineStyle: {
                    color: 'rgba(30, 58, 138, 1)',
                    width: 2
                },
                itemStyle: {
                    color: 'rgba(30, 58, 138, 1)'
                }
            }]
        }],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderColor: '#e2e8f0',
            textStyle: {
                color: '#1f2937'
            },
            formatter: function(params) {
                return `${params.name}: ${params.value}`;
            }
        }
    };

    chart.setOption(option);
    
    // Handle window resize
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
}

/**
 * Animasi untuk progress bar
 */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    if (!progressBars.length) return;

    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || bar.style.width;
        bar.style.width = '0';
        bar.style.transition = 'width 1s ease-in-out';
        
        // Gunakan setTimeout untuk memastikan transisi berjalan
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

/**
 * Animasi untuk circular progress bars
 */
function animateCircularProgressBars() {
    const circles = document.querySelectorAll('.circular-progress circle:nth-child(2)');
    if (!circles.length) return;

    circles.forEach(circle => {
        const svg = circle.closest('svg');
        const text = svg?.querySelector('text');
        const percentage = text ? parseInt(text.textContent) : 0;
        
        // Reset ke 0
        const radius = 64;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        // Animasikan progress
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            circle.style.strokeDashoffset = offset;
            
            // Animasikan teks persentase
            if (text) {
                let current = 0;
                const duration = 1500; // ms
                const increment = Math.ceil(percentage / (duration / 16)); // 60fps
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= percentage) {
                        current = percentage;
                        clearInterval(timer);
                    }
                    text.textContent = `${current}%`;
                }, 16);
            }
        }, 100);
    });
}

/**
 * Inisialisasi semua komponen skills
 */
function initializeSkills() {
    // Pastikan ECharts sudah dimuat
    if (typeof echarts === 'undefined') {
        console.error('ECharts is not loaded');
        return;
    }

    initializeSoftSkillsChart();
    animateProgressBars();
    animateCircularProgressBars();
}

// Jalankan inisialisasi saat dokumen siap
document.addEventListener('DOMContentLoaded', initializeSkills);

// Ekspor fungsi untuk digunakan di file lain jika diperlukan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSkills,
        initializeSoftSkillsChart,
        animateProgressBars,
        animateCircularProgressBars
    };
}
